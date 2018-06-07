'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

exports.default = function (config) {
  return {
    client: 'mysql',
    connection: {
      host: config.get('mysql.host'),
      user: config.get('mysql.user'),
      password: config.get('mysql.pass'),
      database: config.get('mysql.database')
    }
  };
};