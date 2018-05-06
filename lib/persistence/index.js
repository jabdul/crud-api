'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.close = undefined;

var _config = require('../config');

var _config2 = _interopRequireDefault(_config);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

// export const schema = client => ({
//   user: {
//     findAll: async () => await client.select().tabel('user'),
//   }
// });

var connection = {
  client: 'mysql',
  connection: {
    host: _config2.default.get('mysql.host'),
    user: _config2.default.get('mysql.user'),
    password: _config2.default.get('mysql.pass'),
    database: _config2.default.get('mysql.database')
  }
}; // Replace with dependency injection
// in later iteration.
var close = exports.close = function close(knex) {
  return knex.destroy();
};

exports.default = function () {
  var connect = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : connection;
  return require('knex')(connect);
};