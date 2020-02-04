"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

var _path = _interopRequireDefault(require("path"));

var _hapiAuthJwt = _interopRequireDefault(require("hapi-auth-jwt2"));

var _ = require("./");

var _config = require("./config");

var _mongoose = require("./persistence/mongoose");

var _routes = _interopRequireDefault(require("./routes"));

var _services = _interopRequireDefault(require("./services"));

// eslint-disable-line no-unused-vars
// import { schema as mysqlSchema } from './persistence/mysql';
const validate = async () => {
  // Apply validation check here...
  return {
    isValid: true
  };
};

const init = async () => {
  const app = await (0, _.server)({
    dbConnect: _.mongooseConnect,
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
  await app.start();
  console.log(`App runninng on ${app.info.uri}`); // eslint-disable-line
};

init();