'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _hapi = require('hapi');

var _hapi2 = _interopRequireDefault(_hapi);

var _ramda = require('ramda');

var _joi = require('joi');

var _joi2 = _interopRequireDefault(_joi);

var _uuid = require('uuid');

var _uuid2 = _interopRequireDefault(_uuid);

var _halson = require('halson');

var _halson2 = _interopRequireDefault(_halson);

var _config = require('./config');

var _config2 = _interopRequireDefault(_config);

var _mongo = require('./persistence/mongo');

var _mongo2 = _interopRequireDefault(_mongo);

var _services = require('./services');

var _services2 = _interopRequireDefault(_services);

var _routes = require('./routes');

var _routes2 = _interopRequireDefault(_routes);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

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

  app.events.on('log', function (event, tags) {
    if (tags.error) {
      console.log('Server error: ' + (event.error ? event.error.message : 'unknown')); // eslint-disable-line
    }
  });

  var services = (0, _ramda.compose)(_services2.default, _mongo.schema, _mongo2.default)(_config2.default);

  try {
    (0, _routes2.default)().map(async function (route) {
      return await app.route(route({
        services: services,
        config: _config2.default,
        validate: _joi2.default,
        uuid: _uuid2.default,
        json: _halson2.default
      }));
    });

    await app.start();
    console.log('Server running at:', app.info.uri); // eslint-disable-line
  } catch (error) {
    app.log(['error'], error);
    process.exit(1);
  }
}();
// import dbConnect, { schema } from './persistence/mysql';