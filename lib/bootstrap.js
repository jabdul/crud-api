"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _path = _interopRequireDefault(require("path"));

var _hapiAuthJwt = _interopRequireDefault(require("hapi-auth-jwt2"));

var _2 = require("./");

var _config = require("./config");

var _mongoose = require("./persistence/mongoose");

var _routes = _interopRequireDefault(require("./routes"));

var _services = _interopRequireDefault(require("./services"));

var _env = _interopRequireDefault(require("./env"));

// eslint-disable-line no-unused-vars
// import { schema as mysqlSchema } from './persistence/mysql';
// eslint-disable-line no-unused-vars
const validate = async () => {
  // Apply validation check here...
  return {
    isValid: true
  };
};

const application = () => (0, _2.server)({
  dbConnect: _2.mongooseConnect,
  schema: _mongoose.schema,
  config: _config.conf,
  configFiles: [_path.default.resolve(__dirname, `../config/${String(process.env.NODE_ENV)}.json`)],
  configOptions: {
    dbConnectOptions: {
      useNewUrlParser: true,
      useFindAndModify: false
    }
  },
  routes: _routes.default,
  services: _services.default,
  plugins: [{
    plugin: _hapiAuthJwt.default,
    options: {}
  }],
  postRegisterHook: async app => {
    app.auth.strategy('jwt', 'jwt', {
      key: 'NeverShareYourSecret',
      validate: await validate,
      verifyOptions: {
        algorithms: ['HS256']
      }
    });
    app.auth.default('jwt'); // JWT auth is required for all routes
  },
  swaggerOptions: {
    auth: false,
    tags: {
      'users': 'Operation for handling user records'
    },
    info: {
      title: 'Microservice CRUD API Server',
      description: 'Powering Craft Turf\'s microservice projects',
      version: '0.0.1'
    }
  },
  swaggerUiOptions: {
    title: 'CRUD API',
    path: '/docs',
    authorization: false,
    auth: false,
    swaggerOptions: {
      validatorUrl: null
    }
  },
  loggerOptions: {
    ops: {
      interval: 1000
    },
    reporters: {
      console: [{
        module: 'good-squeeze',
        name: 'Squeeze',
        args: [{
          log: '*',
          response: '*',
          error: '*',
          request: {
            include: ['hapi'],
            exclude: 'sensitive'
          }
        }]
      }, {
        module: 'good-console'
      }, 'stdout']
    }
  }
});

!module.parent && (async () => {
  const app = await application();
  await app.start();
  console.log(`App runninng on ${app.info.uri}`); // eslint-disable-line
})();
var _default = application;
exports.default = _default;