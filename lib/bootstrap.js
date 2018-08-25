'use strict';

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
(0, _.server)({
  dbConnect: _.mongooseConnect,
  schema: _mongoose.schema,
  config: _config.conf,
  routes: _routes2.default,
  services: _services2.default,
  swaggerOptions: {
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
    title: 'Example API',
    path: '/docs',
    swaggerOptions: {
      validatorUrl: null
    }
  }
});