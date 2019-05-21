import fs from 'fs';
import path from 'path';
import Hapi from '@hapi/hapi';
import { compose } from 'ramda';
import Joi from 'joi';
import uuid from 'uuid';
import halson from 'halson';
import swaggered from 'hapi-swaggered';
import swaggeredUI from 'hapi-swaggered-ui';
import vision from 'vision';
import inert from 'inert';
import requireHttps from 'hapi-require-https';
import good from 'good';

export default async function start({
  dbConnect,
  schema,
  config,
  routes,
  services,
  plugins = [],
  postRegisterHook = () => {},
  swaggerOptions = {},
  swaggerUiOptions = {},
  loggerOptions = {},
  serverOptions = {},
}: {
  routes: () => Array<({}) => mixed>,
  plugins: Array<mixed>,
}) {
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

  await app.register([...[
    inert,
    vision,
    { plugin: swaggered, options: swaggerOptions },
    { plugin: swaggeredUI, options: swaggerUiOptions },
    { plugin: good, options: loggerOptions },
    { plugin: requireHttps, options: {} }
  ], ...plugins]);

  await postRegisterHook.call(this, app);

  const serve = compose(services, schema, dbConnect)(config);

  try {
    routes().map(async route => await app.route(route({
      services: serve,
      config,
      validate: Joi,
      uuid,
      json: halson,
    })));

    console.info('Server setup completed...', 'Start the server.'); // eslint-disable-line
    return app;
  } catch(error) {
    app.log(['error'], error);
    process.exit(1);
  }
};
