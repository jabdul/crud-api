"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _default = config => ({
  client: 'mysql',
  connection: {
    host: config.get('mysql.host'),
    user: config.get('mysql.user'),
    password: config.get('mysql.pass'),
    database: config.get('mysql.database')
  }
});

exports.default = _default;