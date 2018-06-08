'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _hapi = require('hapi');

var _hapi2 = _interopRequireDefault(_hapi);

var _ramda = require('ramda');

var _config = require('./config');

var _config2 = _interopRequireDefault(_config);

var _mysql = require('./persistence/mysql');

var _mysql2 = _interopRequireDefault(_mysql);

var _services = require('./services');

var _services2 = _interopRequireDefault(_services);

var _routes = require('./routes');

var _routes2 = _interopRequireDefault(_routes);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

// import dbConnect, { schema } from './persistence/mongo';
exports.default = async function start() {
  var app = new _hapi2.default.Server({
    host: _config2.default.get('server.hostname'),
    port: _config2.default.get('server.port'),
    debug: { request: ['error'] }
  });

  process.on('unhandledRejection', function (error) {
    app.log(['error'], error);
    process.exit(1);
  });

  var services = (0, _ramda.compose)(_services2.default, _mysql.schema, _mysql2.default)(_config2.default);

  try {
    (0, _routes2.default)().map(async function (route) {
      return await app.route(route({
        services: services,
        config: _config2.default
      }));
    });

    await app.start();
    console.log('Server running at:', app.info.uri); // eslint-disable-line
  } catch (error) {
    app.log(['error'], error);
    process.exit(1);
  }
}();