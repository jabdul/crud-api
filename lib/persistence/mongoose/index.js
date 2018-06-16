'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.close = exports.schema = undefined;

var _mongoose = require('mongoose');

var _mongoose2 = _interopRequireDefault(_mongoose);

var _connect = require('./connect');

var _connect2 = _interopRequireDefault(_connect);

var _queries = require('./queries');

var _queries2 = _interopRequireDefault(_queries);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var schema = exports.schema = function schema(client) {
  return (0, _queries2.default)(client);
};

var close = exports.close = function close(mongo) {
  return mongo.disconnect();
};

exports.default = async function (config) {
  return await (0, _connect2.default)(_mongoose2.default, config);
};