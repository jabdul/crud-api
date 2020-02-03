"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = start;

var _fs = _interopRequireDefault(require("fs"));

var _path = _interopRequireDefault(require("path"));

var _hapi = _interopRequireDefault(require("@hapi/hapi"));

var _joi = _interopRequireDefault(require("joi"));

var _uuid = _interopRequireDefault(require("uuid"));

var _halson = _interopRequireDefault(require("halson"));

var _hapiSwaggered = _interopRequireDefault(require("hapi-swaggered"));

var _hapiSwaggeredUi = _interopRequireDefault(require("hapi-swaggered-ui"));

var _vision = _interopRequireDefault(require("vision"));

var _inert = _interopRequireDefault(require("inert"));

var _hapiRequireHttps = _interopRequireDefault(require("hapi-require-https"));

var _good = _interopRequireDefault(require("good"));

var _routes = _interopRequireDefault(require("./monitoring/health/routes"));

async function start({
  dbConnect,
  schema,
  config,
  routes,
  services,
  plugins = [],
  postRegisterHook = () => {},
  swaggerOptions = {},
  swaggerUiOptions = {},
  loggerOptions = {},
  serverOptions = {}
}) {
  const tls = config.get('server.secure') && {
    key: _fs.default.readFileSync(_path.default.resolve(__dirname, config.get('server.tlsKey'))),
    cert: _fs.default.readFileSync(_path.default.resolve(__dirname, config.get('server.tlsCert')))
  };
  const app = new _hapi.default.Server({
    host: config.get('server.hostname'),
    port: config.get('server.port'),
    tls,
    debug: {
      request: ['error', 'info', 'warn'],
      log: ['error', 'info', 'warn']
    },
    ...serverOptions
  });
  process.on('unhandledRejection', error => {
    app.log(['error'], error);
    process.exit(1);
  });
  app.events.on('log', (event, tags) => {
    if (tags.error) {
      console.log(`Server error: ${event.error ? event.error.stack : 'unknown'}`); // eslint-disable-line no-console
    }
  });
  await app.register([...[_inert.default, _vision.default, {
    plugin: _hapiSwaggered.default,
    options: swaggerOptions
  }, {
    plugin: _hapiSwaggeredUi.default,
    options: swaggerUiOptions
  }, {
    plugin: _good.default,
    options: loggerOptions
  }, {
    plugin: _hapiRequireHttps.default,
    options: {}
  }], ...plugins]);
  await postRegisterHook.call(this, app);
  app.db = dbConnect(config);
  app.schema = schema(app.db);
  const serve = services(app.schema);

  try {
    app.method({
      name: 'services',
      method: () => serve,
      options: {}
    });
    app.method({
      name: 'config',
      method: () => config,
      options: {}
    });
    app.method({
      name: 'json',
      method: () => _halson.default,
      options: {}
    });
    [_routes.default, ...routes()].map(async route => await app.route(route({
      services: serve,
      config,
      validate: _joi.default,
      uuid: _uuid.default,
      json: _halson.default
    })));
    console.info('Server setup completed...'); // eslint-disable-line

    return app;
  } catch (error) {
    app.log(['error'], error);
    process.exit(1);
  }
}