import fs from 'fs';
import path from 'path';
import Hapi from '@hapi/hapi';
import Joi from 'joi';
import hapiSwagger from 'hapi-swagger';

import vision from '@hapi/vision';
import inert from '@hapi/inert';
import requireHttps from 'hapi-require-https';
import pino from 'hapi-pino';
import json from 'fast-json-stringify';

import checkApplicationHealth from './monitoring/health/routes';
import { DbClient, Dict, ServerArgs } from './';

type ServerType = Hapi.Server & { db?: void | typeof import('mongoose'); schema?: Dict };

export default async ({
  dbConnect,
  schema,
  config,
  routes,
  services,
  plugins = [],
  postRegisterHook,
  swaggerOptions = {},
  loggerOptions = {},
  serverOptions = {},
}: ServerArgs): Promise<ServerType> => {
  const tls = config.get('server.secure') && {
    key: fs.readFileSync(path.resolve(__dirname, config.get('server.tlsKey'))),
    cert: fs.readFileSync(path.resolve(__dirname, config.get('server.tlsCert'))),
  };
  const app: ServerType = new Hapi.Server({
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
      if (event.error) {
        const error = event.error as Error;
        console.log('Server error: ', error.stack); // eslint-disable-line no-console
      } else {
        console.log(`Server error: unknown`); // eslint-disable-line no-console
      }
    }
  });

  await app.register([
    ...[
      inert,
      vision,
      { plugin: hapiSwagger, options: swaggerOptions },
      // { plugin: swaggeredUI, options: swaggerUiOptions },
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

  app.db = await dbConnect(config);
  const databaseClient = app.db as unknown;
  app.schema = schema(databaseClient as DbClient);
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
    app.method({
      name: 'json',
      method: () => json,
      options: {},
    });

    [checkApplicationHealth, ...routes()].map(
      async route =>
        await app.route(
          route({
            services: serve,
            config,
            validate: Joi,
            json,
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
