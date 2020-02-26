import setupConfig, { conf as env, dbConfig } from './config';
import server from './server';
import mysqlConnect from './persistence/mysql';
import mongooseConnect from './persistence/mongoose';

module.exports = {
  server: async({
    dbConnect,
    schema,
    serverOptions,
    config,
    configOptions,
    configFiles = [],
    routes,
    services,
    plugins,
    postRegisterHook,
    swaggerOptions,
    swaggerUiOptions,
    loggerOptions,
  }) => await server({
    dbConnect,
    schema,
    serverOptions,
    config: setupConfig(config, configFiles, configOptions),
    routes,
    services,
    plugins,
    postRegisterHook,
    swaggerOptions,
    swaggerUiOptions,
    loggerOptions,
  }),
  mysqlConnect,
  mongooseConnect,
  config: env,
  dbConfig,
};
