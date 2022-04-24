'use strict';
var __createBinding =
  (this && this.__createBinding) ||
  (Object.create
    ? function(o, m, k, k2) {
        if (k2 === undefined) k2 = k;
        var desc = Object.getOwnPropertyDescriptor(m, k);
        if (!desc || ('get' in desc ? !m.__esModule : desc.writable || desc.configurable)) {
          desc = {
            enumerable: true,
            get: function() {
              return m[k];
            },
          };
        }
        Object.defineProperty(o, k2, desc);
      }
    : function(o, m, k, k2) {
        if (k2 === undefined) k2 = k;
        o[k2] = m[k];
      });
var __setModuleDefault =
  (this && this.__setModuleDefault) ||
  (Object.create
    ? function(o, v) {
        Object.defineProperty(o, 'default', { enumerable: true, value: v });
      }
    : function(o, v) {
        o['default'] = v;
      });
var __importStar =
  (this && this.__importStar) ||
  function(mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null)
      for (var k in mod)
        if (k !== 'default' && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
  };
var __importDefault =
  (this && this.__importDefault) ||
  function(mod) {
    return mod && mod.__esModule ? mod : { default: mod };
  };
Object.defineProperty(exports, '__esModule', { value: true });
const path = __importStar(require('path'));
const hapi_auth_jwt2_1 = __importDefault(require('hapi-auth-jwt2'));
const _1 = require('./'); // eslint-disable-line no-unused-vars
// import { schema as mysqlSchema } from './persistence/mysql';
const config_1 = require('./config');
const mongoose_1 = require('./persistence/mongoose');
const routes_1 = __importDefault(require('./routes'));
const services_1 = __importDefault(require('./services'));
require('./env');
const validate = async (/* payload, request*/) => {
  // Apply validation check here...
  return { isValid: true };
};
const application = () =>
  (0, _1.server)({
    dbConnect: _1.mongooseConnect,
    schema: mongoose_1.schema,
    config: config_1.conf,
    configFiles: [path.resolve(__dirname, `../config/${String(process.env.NODE_ENV)}.json`)],
    configOptions: {
      dbConnectOptions: { useNewUrlParser: true },
      dbModifiers: { createIndex: true },
    },
    routes: routes_1.default,
    services: services_1.default,
    plugins: [{ plugin: hapi_auth_jwt2_1.default, options: {} }],
    postRegisterHook: async app => {
      app.auth.strategy('jwt', 'jwt', {
        key: 'NeverShareYourSecret',
        validate: await validate,
        verifyOptions: { algorithms: ['HS256'] },
      });
      app.auth.default('jwt'); // JWT auth is required for all routes
    },
    swaggerOptions: {
      auth: false,
      tags: [
        {
          description: 'Operation for handling user records',
          name: 'users',
        },
      ],
      info: {
        title: 'Microservice CRUD API Server',
        description: "Powering Craft Turf's microservice projects",
        version: '0.0.1',
      },
    },
    loggerOptions: {
      redact: {
        paths: [
          'req.headers.authorization',
          '*.password',
          'pid',
          'hostname',
          'app',
          'responseTime',
          'req.id',
          'req.method',
          'req.headers',
          'req.remoteAddress',
          'req.remotePort',
          'res',
        ],
        remove: true,
      },
    },
    serverOptions: {},
  });
!module.parent &&
  (async () => {
    const app = await application();
    await app.start();
    app.log('App runninng on', app.info.uri);
  })();
exports.default = application;
//# sourceMappingURL=bootstrap.js.map
