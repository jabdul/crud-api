import fs from 'fs';
import path from 'path';
import Hapi from 'hapi';
import { compose } from 'ramda';
import Joi from 'joi';
import uuid from 'uuid';
import halson from 'halson';
import swaggered from 'hapi-swaggered';
import swaggeredUI from 'hapi-swaggered-ui';
import vision from 'vision';
import inert from 'inert';
import requireHttps from 'hapi-require-https';

export default async function start({
  dbConnect,
  schema,
  config,
  routes,
  services,
  swaggerOptions = {},
  swaggerUiOptions = {},
}) {
  const tls = {
    key: fs.readFileSync(path.resolve(__dirname, config.get('server.tlsKey'))),
    cert: fs.readFileSync(path.resolve(__dirname, config.get('server.tlsCert'))),
  };
  const app = new Hapi.Server({
    host: config.get('server.hostname'),
    port: config.get('server.port'),
    tls,
    debug: { request: ['error'] },
  });

  process.on('unhandledRejection', error => {
    app.log(['error'], error);
    process.exit(1);
  });

  app.events.on('log', (event, tags) => {
    if (tags.error) {
      console.log(`Server error: ${event.error ? event.error.message : 'unknown'}`); // eslint-disable-line
    }
  });

  await app.register([
    inert,
    vision,
    { plugin: swaggered, options: swaggerOptions },
    { plugin: swaggeredUI, options: swaggerUiOptions },
    { plugin: requireHttps, options: {} }
  ]);

  const serve = compose(services, schema, dbConnect)(config);

  try {
    routes().map(async route => await app.route(route({
      services: serve,
      config,
      validate: Joi,
      uuid,
      json: halson,
    })));

    await app.start();
    console.log('Server running at:', app.info.uri); // eslint-disable-line
  } catch(error) {
    app.log(['error'], error);
    process.exit(1);
  }
};
