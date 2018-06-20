'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.close = exports.schema = undefined;

var _connect = require('./connect');

var _connect2 = _interopRequireDefault(_connect);

var _queries = require('./queries');

var _queries2 = _interopRequireDefault(_queries);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var schema = exports.schema = function schema(client) {
  return (0, _queries2.default)(client);
};

var close = exports.close = function close(knex) {
  return knex.destroy();
};

exports.default = function (config) {
  return require('knex')((0, _connect2.default)(config));
};