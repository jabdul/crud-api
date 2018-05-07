import Hapi from 'hapi';
import { compose } from 'ramda';

import initServices from '../services';
import dbConnect, { schema } from '../persistence/mysql';
import routes from '../routes';

import config from '../config';

const dbClient = schema(dbConnect({
  client: 'mysql',
  connection: {
    host: config.get('mysql.host'),
    user: config.get('mysql.user'),
    password: config.get('mysql.pass'),
    database: config.get('mysql.database'),
  }}));

const services = compose(initServices, schema)(dbClient);

const app = new Hapi.Server({
  host: 'localhost',
  port: 4010,
  debug: { request: ['error'] }
});

// // Add the route
// app.route({
//     method:'GET',
//     path:'/users',
//     handler:function() {
//
//         return'hello world';
//     }
// });


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
