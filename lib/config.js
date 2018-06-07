'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _convict = require('convict');

var _convict2 = _interopRequireDefault(_convict);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

require('dotenv').config();


var config = (0, _convict2.default)({
  env: {
    doc: 'The application environment',
    format: ['development', 'test', 'production'],
    default: 'development',
    env: 'NODE_ENV'
  },
  server: {
    hostname: {
      doc: 'Microservice hostname',
      format: String,
      default: 'localhost',
      env: 'HOSTNAME',
      arg: 'hostname'
    },
    port: {
      doc: 'Microservice port',
      format: 'port',
      default: 4015,
      env: 'PORT',
      arg: 'port'
    }
  },
  mysql: {
    host: {
      doc: 'MySQL Server hostname',
      format: String,
      default: 'localhost',
      env: 'MYSQL_HOST',
      arg: 'mysql-host'
    },
    database: {
      doc: 'MySQL database',
      format: String,
      default: '',
      env: 'MYSQL_DB',
      arg: 'mysql-db'
    },
    user: {
      doc: 'MySQL client username',
      format: String,
      default: 'user',
      env: 'MYSQL_USER',
      arg: 'mysql-user'
    },
    pass: {
      doc: 'MySQL client password',
      format: String,
      default: 'password',
      env: 'MYSQL_PASS',
      arg: 'mysql-pass'
    }
  }
});

exports.default = config;