'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _toConsumableArray2 = require('babel-runtime/helpers/toConsumableArray');

var _toConsumableArray3 = _interopRequireDefault(_toConsumableArray2);

var _fs = require('fs');

var _fs2 = _interopRequireDefault(_fs);

var _path = require('path');

var _path2 = _interopRequireDefault(_path);

var _hapi = require('hapi');

var _hapi2 = _interopRequireDefault(_hapi);

var _ramda = require('ramda');

var _joi = require('joi');

var _joi2 = _interopRequireDefault(_joi);

var _uuid = require('uuid');

var _uuid2 = _interopRequireDefault(_uuid);

var _halson = require('halson');

var _halson2 = _interopRequireDefault(_halson);

var _hapiSwaggered = require('hapi-swaggered');

var _hapiSwaggered2 = _interopRequireDefault(_hapiSwaggered);

var _hapiSwaggeredUi = require('hapi-swaggered-ui');

var _hapiSwaggeredUi2 = _interopRequireDefault(_hapiSwaggeredUi);

var _vision = require('vision');

var _vision2 = _interopRequireDefault(_vision);

var _inert = require('inert');

var _inert2 = _interopRequireDefault(_inert);

var _hapiRequireHttps = require('hapi-require-https');

var _hapiRequireHttps2 = _interopRequireDefault(_hapiRequireHttps);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.default = async function start(_ref) {
  var dbConnect = _ref.dbConnect,
      schema = _ref.schema,
      config = _ref.config,
      routes = _ref.routes,
      services = _ref.services,
      _ref$plugins = _ref.plugins,
      plugins = _ref$plugins === undefined ? [] : _ref$plugins,
      _ref$postRegisterHook = _ref.postRegisterHook,
      postRegisterHook = _ref$postRegisterHook === undefined ? function () {} : _ref$postRegisterHook,
      _ref$swaggerOptions = _ref.swaggerOptions,
      swaggerOptions = _ref$swaggerOptions === undefined ? {} : _ref$swaggerOptions,
      _ref$swaggerUiOptions = _ref.swaggerUiOptions,
      swaggerUiOptions = _ref$swaggerUiOptions === undefined ? {} : _ref$swaggerUiOptions;

  var tls = {
    key: _fs2.default.readFileSync(_path2.default.resolve(__dirname, config.get('server.tlsKey'))),
    cert: _fs2.default.readFileSync(_path2.default.resolve(__dirname, config.get('server.tlsCert')))
  };
  var app = new _hapi2.default.Server({
    host: config.get('server.hostname'),
    port: config.get('server.port'),
    tls: tls,
    debug: { request: ['error'] }
  });

  process.on('unhandledRejection', function (error) {
    app.log(['error'], error);
    process.exit(1);
  });

  app.events.on('log', function (event, tags) {
    if (tags.error) {
      console.log('Server error: ' + (event.error ? event.error.stack : 'unknown')); // eslint-disable-line
    }
  });

  await app.register([_inert2.default, _vision2.default, { plugin: _hapiSwaggered2.default, options: swaggerOptions }, { plugin: _hapiSwaggeredUi2.default, options: swaggerUiOptions }, { plugin: _hapiRequireHttps2.default, options: {} }].concat((0, _toConsumableArray3.default)(plugins)));

  await postRegisterHook.call(this, app);

  var serve = (0, _ramda.compose)(services, schema, dbConnect)(config);

  try {
    routes().map(async function (route) {
      return await app.route(route({
        services: serve,
        config: config,
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
};