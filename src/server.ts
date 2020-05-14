import fs from 'fs';
import path from 'path';
import Hapi from '@hapi/hapi';
import Joi from '@hapi/joi';
import swaggered from 'hapi-swaggered';
import swaggeredUI from 'hapi-swaggered-ui';
import vision from '@hapi/vision';
import inert from '@hapi/inert';
import requireHttps from 'hapi-require-https';
import pino from 'hapi-pino';

import checkApplicationHealth from './monitoring/health/routes';
import { ServerArgs } from './';

export default async ({
  dbConnect,
  schema,
  config,
  routes,
  services,
  plugins = [],
  postRegisterHook,
  swaggerOptions = {},
  swaggerUiOptions = {},
  loggerOptions = {},
  serverOptions = {},
}: ServerArgs): Promise<Hapi.Server> => {
  const tls = config.get('server.secure') && {
    key: fs.readFileSync(path.resolve(__dirname, config.get('server.tlsKey'))),
    cert: fs.readFileSync(path.resolve(__dirname, config.get('server.tlsCert'))),
  };
  const app = new Hapi.Server({
    host: config.get('server.hostname'),
    port: config.get('server.port'),
    tls,
    debug: {
      request: ['error', 'info', 'warn'],
      log: ['error', 'info', 'warn'],
    },
    ...serverOptions,
  });

  process.on('unhandledRejection', error => {
    app.log(['error'], error);
    process.exit(1);
  });

  app.events.on('log', (event, tags) => {
    if (tags.error) {
      console.log(`Server error: ${event.error ? event.error.stack : 'unknown'}`); // eslint-disable-line no-console
    }
  });

  await app.register([
    ...[
      inert,
      vision,
      { plugin: swaggered, options: swaggerOptions },
      { plugin: swaggeredUI, options: swaggerUiOptions },
      {
        plugin: pino,
        options: {
          prettyPrint: process.env.NODE_ENV !== 'production',
          redact: {
            paths: ['req.headers.authorization', '*.password'],
            remove: true,
          },
          logPayload: true,
          ignorePaths: ['/monitoring/healthz'],
          ...loggerOptions,
        },
      },
      { plugin: requireHttps, options: {} },
    ],
    ...plugins,
  ]);

  await postRegisterHook.call(this, app);

  app.db = dbConnect(config);
  app.schema = schema(app.db);
  const serve = services(app.schema);

  try {
    app.method({
      name: 'services',
      method: () => serve,
      options: {},
    });

    app.method({
      name: 'config',
      method: () => config,
      options: {},
    });
    [checkApplicationHealth, ...routes()].map(
      async route =>
        await app.route(
          route({
            services: serve,
            config,
            validate: Joi,
          })
        )
    );

    // Not needed in test env
    process.env.NODE_ENV !== 'test' && console.info('Server setup completed...'); // eslint-disable-line
    return app;
  } catch (error) {
    app.log(['error'], error);
    process.exit(1);
  }
};
