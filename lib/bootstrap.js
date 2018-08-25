'use strict';

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
  }
});