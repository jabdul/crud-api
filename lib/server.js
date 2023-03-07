'use strict';
var __importDefault =
  (this && this.__importDefault) ||
  function(mod) {
    return mod && mod.__esModule ? mod : { default: mod };
  };
Object.defineProperty(exports, '__esModule', { value: true });
const fs_1 = __importDefault(require('fs'));
const path_1 = __importDefault(require('path'));
const hapi_1 = require('@hapi/hapi');
const joi_1 = __importDefault(require('joi'));
const hapi_swagger_1 = __importDefault(require('hapi-swagger'));
const vision_1 = __importDefault(require('@hapi/vision'));
const inert_1 = __importDefault(require('@hapi/inert'));
const hapi_require_https_1 = __importDefault(require('hapi-require-https'));
const hapi_pino_1 = __importDefault(require('hapi-pino'));
const fast_json_stringify_1 = __importDefault(require('fast-json-stringify'));
const routes_1 = __importDefault(require('./monitoring/health/routes'));
exports.default = async ({
  dbConnect,
  schema,
  config,
  routes,
  services,
  plugins = [],
  postRegisterHook,
  swaggerOptions = {},
  loggerOptions = {},
  serverOptions = {},
  dockerized,
  intializers,
}) => {
  const tls = config.get('server.secure') && {
    key: fs_1.default.readFileSync(path_1.default.resolve(__dirname, config.get('server.tlsKey'))),
    cert: fs_1.default.readFileSync(path_1.default.resolve(__dirname, config.get('server.tlsCert'))),
  };
  const app = new hapi_1.Server(
    Object.assign(
      {
        host: dockerized ? config.get('dockerizedHostname') : config.get('server.hostname'),
        port: config.get('server.port'),
        tls,
        debug: {
          request: ['error', 'info', 'warn'],
          log: ['error', 'info', 'warn'],
        },
      },
      serverOptions
    )
  );
  process.on('unhandledRejection', error => {
    app.log(['error'], error);
    process.exit(1);
  });
  app.events.on('log', (event, tags) => {
    if (tags.error) {
      if (event.error) {
        const error = event.error;
        console.log('Server error: ', error.stack); // eslint-disable-line no-console
      } else {
        console.log(`Server error: unknown`); // eslint-disable-line no-console
      }
    }
  });
  await app.register([
    ...[
      inert_1.default,
      vision_1.default,
      { plugin: hapi_swagger_1.default, options: swaggerOptions },
      {
        plugin: hapi_pino_1.default,
        options: Object.assign(
          {
            prettyPrint: process.env.NODE_ENV !== 'production',
            redact: {
              paths: ['req.headers.authorization', '*.password'],
              remove: true,
            },
            logPayload: true,
            ignorePaths: ['/monitoring/healthz'],
          },
          loggerOptions
        ),
      },
      { plugin: hapi_require_https_1.default, options: {} },
    ],
    ...plugins,
  ]);
  await (postRegisterHook === null || postRegisterHook === void 0 ? void 0 : postRegisterHook.call(this, app));
  const dbConnection = await dbConnect(config);
  app.db = dbConnection;
  app.schema = schema(app.db);
  const serve = services(app.schema);
  try {
    app.method({
      name: 'services',
      method: () => serve,
      options: {},
    });
    app.method({
      name: 'config',
      method: () => config,
      options: {},
    });
    app.method({
      name: 'json',
      method: () => fast_json_stringify_1.default,
      options: {},
    });
    [routes_1.default, ...routes()].map(
      async route =>
        await app.route(
          route({
            services: serve,
            config,
            validate: joi_1.default,
            json: fast_json_stringify_1.default,
          })
        )
    );
    intializers.length && (await Promise.all(intializers.map(init => init(app, config))));
    // Not needed in test env
    process.env.NODE_ENV !== 'test' && console.info('Server setup completed...'); // eslint-disable-line
    return app;
  } catch (error) {
    app.log(['error'], error);
    process.exit(1);
  }
};
//# sourceMappingURL=server.js.map
