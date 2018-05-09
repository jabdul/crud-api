import Hapi from 'hapi';
import { compose } from 'ramda';

import dbConnect, { schema } from '../persistence/mysql';
import initServices from '../services';
import routes from '../routes';

import config from '../config';

const dbClient = dbConnect({
  client: 'mysql',
  connection: {
    host: config.get('mysql.host'),
    user: config.get('mysql.user'),
    password: config.get('mysql.pass'),
    database: config.get('mysql.database'),
  }
});

const services = compose(initServices, schema)(dbClient);

const app = new Hapi.Server({
  host: 'localhost',
  port: 4010,
  debug: { request: ['error'] },
});

async function start() {
  try {
    routes().map(async route => await app.route(route({
    services,
  })));

    await app.start();
    console.log('Server running at:', app.info.uri); // eslint-disable-line
  } catch(error) {
    app.log(['error'], error);
    process.exit(1);
  }
}

process.on('unhandledRejection', error => {
  app.log(['error'], error);
  process.exit(1);
});

start();
