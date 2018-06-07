'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.close = exports.schema = undefined;

var _connect = require('./connect');

var _connect2 = _interopRequireDefault(_connect);

var _createUser = require('./queries/createUser');

var _createUser2 = _interopRequireDefault(_createUser);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var schema = exports.schema = function schema(client) {
  return {
    users: {
      create: async function create(payload) {
        return await (0, _createUser2.default)({ client: client, payload: payload });
      }
    }
  };
};

var close = exports.close = function close(knex) {
  return knex.destroy();
};

exports.default = function (config) {
  return require('knex')((0, _connect2.default)(config));
};