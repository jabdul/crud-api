import path from 'path';
import hapiAuthJwt2 from 'hapi-auth-jwt2';
import { server, mysqlConnect, mongooseConnect } from './'; // eslint-disable-line no-unused-vars
// import { schema as mysqlSchema } from './persistence/mysql';
import { conf as env } from './config';
import { schema as mongooseSchema } from './persistence/mongoose';
import routes from './routes';
import services from './services';

const validate = async (/* payload, request*/) => {
  // Apply validation check here...
  return { isValid: true };
};

const init = async () => {
  const app = await server({
    dbConnect: mongooseConnect,
    schema: mongooseSchema,
    config: env,
    configFiles: [path.resolve(__dirname, `../config/${String(process.env.NODE_ENV)}.json`)],
    configOptions: {
      dbConnectOptions: { useNewUrlParser: true, useFindAndModify: false }
    },
    routes,
    services,
    plugins: [{ plugin: hapiAuthJwt2, options: {} }],
    postRegisterHook: async app => {
      app.auth.strategy('jwt', 'jwt', {
        key: 'NeverShareYourSecret',
        validate: await validate,
        verifyOptions: { algorithms: [ 'HS256' ] }
      });
      app.auth.default('jwt'); // JWT auth is required for all routes
    },
    swaggerOptions: {
      auth: false,
      tags: {
        'users': 'Operation for handling user records'
      },
      info: {
        title: 'Microservice CRUD API Server',
        description: 'Powering Craft Turf\'s microservice projects',
        version: '0.0.1'
      },
    },
    swaggerUiOptions: {
      title: 'CRUD API',
      path: '/docs',
      authorization: false,
      auth: false,
      swaggerOptions: {
        validatorUrl: null
      }
    },
    loggerOptions: {
      ops: {
        interval: 1000
      },
      reporters: {
        console: [{
          module: 'good-squeeze',
          name: 'Squeeze',
          args: [{
            log: '*',
            response: '*',
            error: '*',
            request: { include: ['hapi'], exclude: 'sensitive' }
          }]
        }, {
          module: 'good-console'
        }, 'stdout'],
      },
    }
  });

  await app.start();
}

init();
