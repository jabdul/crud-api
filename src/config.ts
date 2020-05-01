import convict, { Config } from 'convict';

const mongoConfig = {
  mongo: {
    host: {
      doc: 'Mongo server hostname',
      format: String,
      default: 'mongodb://127.0.0.1:27017',
      env: 'MONGO_CONNECT',
      arg: 'mongo-connect',
    },
    database: {
      doc: 'Mongo database',
      format: String,
      default: 'crud-api',
      env: 'MONGO_DB',
      arg: 'mongo-db',
    },
    user: {
      doc: 'Mongo client username',
      format: String,
      default: 'user',
      env: 'MONGO_USER',
      arg: 'mongo-user',
    },
    pass: {
      doc: 'Mongo client password',
      format: String,
      default: 'password',
      env: 'MONGO_PASS',
      arg: 'mongo-pass',
    },
  },
};

export const conf = {
  env: {
    doc: 'The application environment',
    format: ['development', 'test', 'production'],
    default: 'development',
    env: 'NODE_ENV',
  },
  server: {
    hostname: {
      doc: 'Microservice hostname',
      format: String,
      default: '127.0.0.1',
      env: 'SERVER_HOSTNAME',
      arg: 'server-hostname',
    },
    port: {
      doc: 'Microservice port',
      format: 'port',
      default: 4015,
      env: 'SERVER_PORT',
      arg: 'server-port',
    },
    tlsCert: {
      doc: 'Security certificate',
      format: String,
      default: '',
      env: 'TLS_CERT',
      arg: 'tls-cert',
    },
    tlsKey: {
      doc: 'Security certificate key',
      format: String,
      default: '',
      env: 'TLS_KEY',
      arg: 'tls-key',
    },
    tlsCa: {
      doc: 'Security certificate authority',
      format: String,
      default: '',
      env: 'TLS_CA',
      arg: 'tls-ca',
    },
    secure: {
      doc: 'Apply tls security layer. Disable if http is preferred',
      format: Boolean,
      default: true,
      env: 'TLS',
      arg: 'tls',
    },
    db: {
      doc: 'Microservice database',
      format: String,
      default: 'mysql',
      env: 'SERVER_DB',
      arg: 'server-db',
    },
  },
  db: {
    dump: {
      doc: 'Mongodb data seed and dump path',
      format: String,
      default: 'dump',
      env: 'DB_SEED',
      arg: 'db-seed',
    },
  },
  mysql: {
    host: {
      doc: 'MySQL Server hostname',
      format: String,
      default: 'localhost',
      env: 'MYSQL_HOST',
      arg: 'mysql-host',
    },
    database: {
      doc: 'MySQL database',
      format: String,
      default: '',
      env: 'MYSQL_DB',
      arg: 'mysql-db',
    },
    user: {
      doc: 'MySQL client username',
      format: String,
      default: 'user',
      env: 'MYSQL_USER',
      arg: 'mysql-user',
    },
    pass: {
      doc: 'MySQL client password',
      format: String,
      default: 'password',
      env: 'MYSQL_PASS',
      arg: 'mysql-pass',
    },
  },
  jwt: {
    secret: {
      doc: 'JWT secret key',
      format: String,
      default: '',
      env: 'JWT_SECRET',
      arg: 'jwt-secret',
    },
    expires: {
      doc: 'JWT expiry in seconds',
      format: Number,
      default: 86400, // one day
      env: 'JWT_EXPIRES',
      arg: 'jwt-expires',
    },
  },
  ...mongoConfig,
};

const convictLoader = ({ appConfig = null, base = null, configFiles = null, options = {} }): Config<object> => {
  const config = convict({ ...(appConfig || {}), ...(base || {}) }).load(options);
  return configFiles ? config.loadFile(configFiles) : config;
};

const loadConfig = (appConfig = {}, configFiles, options = {}): Config<object> =>
  convictLoader({
    appConfig,
    configFiles,
    base: conf,
    options,
  });

export const dbConfig = convictLoader({ base: mongoConfig });

export default loadConfig;
