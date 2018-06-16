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
  services,
  swaggerOptions: {
    tags: {
      'users': 'Operation for handling user records'
    },
    info: {
      title: 'Microservice CRUD API Server',
      description: 'Powering Craft Turf\'s microservice projects',
      version: '0.0.1'
    }
  },
  swaggerUiOptions: {
    title: 'Example API',
    path: '/docs',
    swaggerOptions: {
      validatorUrl: null
    }
  },
});
