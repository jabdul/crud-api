'use strict';

var _path = require('path');

var _path2 = _interopRequireDefault(_path);

var _hapiAuthJwt = require('hapi-auth-jwt2');

var _hapiAuthJwt2 = _interopRequireDefault(_hapiAuthJwt);

var _ = require('./');

var _config = require('./config');

var _mongoose = require('./persistence/mongoose');

var _routes = require('./routes');

var _routes2 = _interopRequireDefault(_routes);

var _services = require('./services');

var _services2 = _interopRequireDefault(_services);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

// eslint-disable-line no-unused-vars
// import { schema as mysqlSchema } from './persistence/mysql';
var validate = async function validate() {
  // Apply validation check here...
  return { isValid: true };
};

(0, _.server)({
  dbConnect: _.mongooseConnect,
  schema: _mongoose.schema,
  config: _config.conf,
  configFiles: [_path2.default.resolve(__dirname, '../config/' + String(process.env.NODE_ENV) + '.json')],
  configOptions: {
    dbConnectOptions: { useNewUrlParser: true, useFindAndModify: false }
  },
  routes: _routes2.default,
  services: _services2.default,
  plugins: [{ plugin: _hapiAuthJwt2.default, options: {} }],
  postRegisterHook: async function postRegisterHook(app) {
    app.auth.strategy('jwt', 'jwt', {
      key: 'NeverShareYourSecret',
      validate: await validate,
      verifyOptions: { algorithms: ['HS256'] }
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
          request: { include: ['hapi'], exclude: 'sensitive' }
        }]
      }, {
        module: 'good-console'
      }, 'stdout']
    }
  }
});