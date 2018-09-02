'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.conf = undefined;

var _extends2 = require('babel-runtime/helpers/extends');

var _extends3 = _interopRequireDefault(_extends2);

var _convict = require('convict');

var _convict2 = _interopRequireDefault(_convict);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var conf = exports.conf = {
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
      default: '127.0.0.1',
      env: 'SERVER_HOSTNAME',
      arg: 'server-hostname'
    },
    port: {
      doc: 'Microservice port',
      format: 'port',
      default: 4015,
      env: 'SERVER_PORT',
      arg: 'server-port'
    },
    tlsCert: {
      doc: 'Security certificate',
      format: String,
      default: '',
      env: 'TLS_CERT',
      arg: 'tls-cert'
    },
    tlsKey: {
      doc: 'Security certificate key',
      format: String,
      default: '',
      env: 'TLS_KEY',
      arg: 'tls-key'
    },
    tlsCa: {
      doc: 'Security certificate authority',
      format: String,
      default: '',
      env: 'TLS_CA',
      arg: 'tls-ca'
    },
    db: {
      doc: 'Microservice database',
      format: String,
      default: 'mysql',
      env: 'SERVER_DB',
      arg: 'server-db'
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
      default: 'mongodb://127.0.0.1:27017',
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
};

exports.default = function (appConfig) {
  var options = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
  return (0, _convict2.default)((0, _extends3.default)({}, conf, appConfig)).load(options);
};