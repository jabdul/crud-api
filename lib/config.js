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
      env: 'SERVER_HOSTNAME',
      arg: 'server-hostname'
    },
    port: {
      doc: 'Microservice port',
      format: 'port',
      default: 4015,
      env: 'SERVER_PORT',
      arg: 'server-port'
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
  },
  mongo: {
    host: {
      doc: 'Mongo server hostname',
      format: String,
      default: 'mongodb://localhost:27017',
      env: 'MONGO_CONNECT',
      arg: 'mongo-connect'
    },
    database: {
      doc: 'Mongo database',
      format: String,
      default: '',
      env: 'MONGO_DB',
      arg: 'mongo-db'
    },
    user: {
      doc: 'Mongo client username',
      format: String,
      default: 'user',
      env: 'MONGO_USER',
      arg: 'mongo-user'
    },
    pass: {
      doc: 'Mongo client password',
      format: String,
      default: 'password',
      env: 'MONGO_PASS',
      arg: 'mongo-pass'
    }
  }
});

exports.default = config;