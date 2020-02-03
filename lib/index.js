"use strict";

var _interopRequireWildcard = require("@babel/runtime/helpers/interopRequireWildcard");

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

var _env = _interopRequireDefault(require("./env"));

var _config = _interopRequireWildcard(require("./config"));

var _server = _interopRequireDefault(require("./server"));

var _mysql = _interopRequireDefault(require("./persistence/mysql"));

var _mongoose = _interopRequireDefault(require("./persistence/mongoose"));

// eslint-disable-line no-unused-vars
module.exports = {
  server: async ({
    dbConnect,
    schema,
    serverOptions,
    config,
    configOptions,
    configFiles = [],
    routes,
    services,
    plugins,
    postRegisterHook,
    swaggerOptions,
    swaggerUiOptions,
    loggerOptions
  }) => await (0, _server.default)({
    dbConnect,
    schema,
    serverOptions,
    config: (0, _config.default)(config, configFiles, configOptions),
    routes,
    services,
    plugins,
    postRegisterHook,
    swaggerOptions,
    swaggerUiOptions,
    loggerOptions
  }),
  mysqlConnect: _mysql.default,
  mongooseConnect: _mongoose.default,
  config: _config.baseConfig
};