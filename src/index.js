import env from './config';
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
    swaggerOptions,
    swaggerUiOptions,
  }) => await server({
    dbConnect,
    schema,
    config,
    routes,
    services,
    swaggerOptions,
    swaggerUiOptions,
  }),
  mysqlConnect,
  mongooseConnect,
  config: env,
};
