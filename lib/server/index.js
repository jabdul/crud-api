'use strict';

var _hapi = require('hapi');

var _hapi2 = _interopRequireDefault(_hapi);

var _index = require('../persistence/index');

var _index2 = _interopRequireDefault(_index);

var _config = require('../config');

var _config2 = _interopRequireDefault(_config);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

// const dbClient = dbConnect({
//   client: 'mysql',
//   connection: {
//     host: config.get('mysql.host'),
//     user: config.get('mysql.user'),
//     password: config.get('mysql.pass'),
//     database: config.get('mysql.database'),
//   }
// });

// import { compose } from 'ramda';
//
// import initServices from '../services';
var dbClient = (0, _index.schema)((0, _index2.default)({
  client: 'mysql',
  connection: {
    host: _config2.default.get('mysql.host'),
    user: _config2.default.get('mysql.user'),
    password: _config2.default.get('mysql.pass'),
    database: _config2.default.get('mysql.database')
  } }));

//const services = compose(initServices, schema)(dbClient);

var app = new _hapi2.default.Server({
  host: 'localhost',
  port: 4010,
  debug: { request: ['error'] }
});

// Add the route
app.route({
  method: 'GET',
  path: '/hello',
  handler: function handler(request, h) {

    return 'hello world';
  }
});

async function start() {
  try {
    console.log(dbClient);

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