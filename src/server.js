import Hapi from 'hapi';
import { compose } from 'ramda';

import env from './config';
import dbConnect, { schema } from './persistence/mysql';
import initServices from './services';
import routes from './routes';

export default (async function start() {
  const app = new Hapi.Server({
    host: env.get('server.hostname'),
    port: env.get('server.port'),
    debug: { request: ['error'] },
  });

  process.on('unhandledRejection', error => {
    app.log(['error'], error);
    process.exit(1);
  });

  const services = compose(initServices, schema, dbConnect)(env);

  try {
    routes().map(async route => await app.route(route({
      services,
      config: env,
    })));

    await app.start();
    console.log('Server running at:', app.info.uri); // eslint-disable-line
  } catch(error) {
    app.log(['error'], error);
    process.exit(1);
  }
})();
