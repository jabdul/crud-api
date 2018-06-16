'use strict';

var _config = require('./config');

var _config2 = _interopRequireDefault(_config);

var _server2 = require('./server');

var _server3 = _interopRequireDefault(_server2);

var _mysql = require('./persistence/mysql');

var _mysql2 = _interopRequireDefault(_mysql);

var _mongoose = require('./persistence/mongoose');

var _mongoose2 = _interopRequireDefault(_mongoose);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

module.exports = {
  server: async function server(_ref) {
    var dbConnect = _ref.dbConnect,
        schema = _ref.schema,
        config = _ref.config,
        routes = _ref.routes,
        services = _ref.services,
        swaggerOptions = _ref.swaggerOptions,
        swaggerUiOptions = _ref.swaggerUiOptions;
    return await (0, _server3.default)({
      dbConnect: dbConnect,
      schema: schema,
      config: config,
      routes: routes,
      services: services,
      swaggerOptions: swaggerOptions,
      swaggerUiOptions: swaggerUiOptions
    });
  },
  mysqlConnect: _mysql2.default,
  mongooseConnect: _mongoose2.default,
  config: _config2.default
};