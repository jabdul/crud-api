'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.close = exports.schema = undefined;

var _extends2 = require('babel-runtime/helpers/extends');

var _extends3 = _interopRequireDefault(_extends2);

var _config = require('../config');

var _config2 = _interopRequireDefault(_config);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var schema = exports.schema = function schema(client) {
  return {
    users: {
      create: async function create() {
        var params = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};

        var p = (0, _extends3.default)({}, params);
        await client.table('users').insert(p).returning('*');
      },
      find: async function find(_ref) {
        var id = _ref.id;
        return await client.select().table('users').where({ id: id });
      },

      findAll: async function findAll() {
        return await client.select().table('users');
      },

      remove: async function remove(_ref2) {
        var id = _ref2.id;
        return await client.table('users').where({ id: id }).del();
      },

      upsert: async function upsert() {
        var params = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
        var _ref3 = arguments[1];
        var id = _ref3.id;
        return await client.table('users').where({ id: id }).update(params).returning('*');
      }
    }
  };
}; // Replace with dependency injection
// in later iteration.


var connection = {
  client: 'mysql',
  connection: {
    host: _config2.default.get('mysql.host'),
    user: _config2.default.get('mysql.user'),
    password: _config2.default.get('mysql.pass'),
    database: _config2.default.get('mysql.database')
  }
};

var close = exports.close = function close(knex) {
  return knex.destroy();
};

exports.default = function () {
  var connect = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : connection;
  return require('knex')(connect);
};