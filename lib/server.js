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

var _hapiSwaggered = require('hapi-swaggered');

var _hapiSwaggered2 = _interopRequireDefault(_hapiSwaggered);

var _hapiSwaggeredUi = require('hapi-swaggered-ui');

var _hapiSwaggeredUi2 = _interopRequireDefault(_hapiSwaggeredUi);

var _vision = require('vision');

var _vision2 = _interopRequireDefault(_vision);

var _inert = require('inert');

var _inert2 = _interopRequireDefault(_inert);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

console.log(_vision2.default);

exports.default = async function start(_ref) {
  var dbConnect = _ref.dbConnect,
      schema = _ref.schema,
      config = _ref.config,
      routes = _ref.routes,
      services = _ref.services;

  var app = new _hapi2.default.Server({
    host: config.get('server.hostname'),
    port: config.get('server.port'),
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

  await app.register([_inert2.default, _vision2.default, {
    plugin: _hapiSwaggered2.default,
    options: {
      tags: {
        'users': 'Example foobar description'
      },
      info: {
        title: 'Example API',
        description: 'Powered by node, hapi, joi, hapi-swaggered, hapi-swaggered-ui and swagger-ui',
        version: '1.0'
      }
    }
  }]
  // {
  //   plugin: swaggeredUI,
  //   options: {
  //     title: 'Example API',
  //     path: '/docs',
  //     swaggerOptions: {
  //       validatorUrl: null
  //     }
  //   }
  // }
  /*, (error) => {
   app.log(['error', 'swagger'], error);
   process.exit(1);
  }*/);

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