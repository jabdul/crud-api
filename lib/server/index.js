'use strict';

var _hapi = require('hapi');

var _hapi2 = _interopRequireDefault(_hapi);

var _ramda = require('ramda');

var _services = require('../services');

var _services2 = _interopRequireDefault(_services);

var _index = require('../persistence/index');

var _index2 = _interopRequireDefault(_index);

var _routes = require('../routes');

var _routes2 = _interopRequireDefault(_routes);

var _config = require('../config');

var _config2 = _interopRequireDefault(_config);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var dbClient = (0, _index.schema)((0, _index2.default)({
  client: 'mysql',
  connection: {
    host: _config2.default.get('mysql.host'),
    user: _config2.default.get('mysql.user'),
    password: _config2.default.get('mysql.pass'),
    database: _config2.default.get('mysql.database')
  } }));

var services = (0, _ramda.compose)(_services2.default, _index.schema)(dbClient);

var app = new _hapi2.default.Server({
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
    (0, _routes2.default)().map(async function (route) {
      return await app.route(route({
        services: services
      }));
    });

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