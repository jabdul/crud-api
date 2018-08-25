import _ from './env'; // eslint-disable-line no-unused-vars
import setupConfig, { conf as env } from './config';
import server from './server';
import mysqlConnect from './persistence/mysql';
import mongooseConnect from './persistence/mongoose';

module.exports = {
  server: async({
    dbConnect,
    schema,
    config,
    routes,
    services,
    plugins,
    postRegisterHook,
    swaggerOptions,
    swaggerUiOptions,
  }) => await server({
    dbConnect,
    schema,
    config: setupConfig(config),
    routes,
    services,
    plugins,
    postRegisterHook,
    swaggerOptions,
    swaggerUiOptions,
  }),
  mysqlConnect,
  mongooseConnect,
  config: env,
};
