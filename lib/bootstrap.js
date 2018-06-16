'use strict';

var _ = require('./');

var _mongoose = require('./persistence/mongoose');

var _routes = require('./routes');

var _routes2 = _interopRequireDefault(_routes);

var _services = require('./services');

var _services2 = _interopRequireDefault(_services);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

(0, _.server)({
  dbConnect: _.mongooseConnect,
  schema: _mongoose.schema,
  config: _.config,
  routes: _routes2.default,
  services: _services2.default
}); // eslint-disable-line no-unused-vars
// import { schema as mysqlSchema } from './persistence/mysql';