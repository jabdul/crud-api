import { server, mysqlConnect, mongooseConnect, config } from './'; // eslint-disable-line no-unused-vars
// import { schema as mysqlSchema } from './persistence/mysql';
import { schema as mongooseSchema } from './persistence/mongoose';
import routes from './routes';
import services from './services';

server({
  dbConnect: mongooseConnect,
  schema: mongooseSchema,
  config,
  routes,
  services
});
