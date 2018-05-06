'use strict';

var _hapi = require('hapi');

var _hapi2 = _interopRequireDefault(_hapi);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

// import { compose } from 'ramda';
//
// import initServices from '../services';
// import dbConnect, { schema } from '../persistence/index';

// import config from '../config';
//
// const dbClient = schema(dbConnect({
//   client: 'mysql',
//   connection: {
//     host: config.get('mysql.host'),
//     user: config.get('mysql.user'),
//     password: config.get('mysql.pass'),
//     database: config.get('mysql.database'),
//   }}));

//const services = compose(initServices, schema)(dbClient);

var app = new _hapi2.default.Server({
  host: 'localhost',
  port: 4010,
  debug: { request: ['error'] }
});

// Add the route
app.route({
  method: 'GET',
  path: '/',
  handler: function handler() {

    return 'hello world';
  }
});

async function start() {
  try {
    // console.log(dbClient);

    await app.start();
    console.log('Server running at:', app.info.uri); // eslint-disable-line
  } catch (error) {
    app.log(['error'], error);
    process.exit(1);
  }
}

process.on('unhandledRejection', function (error) {
  app.log(['error'], error);
  process.exit(1);
});

start();