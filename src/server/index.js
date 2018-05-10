import Hapi from 'hapi';
import { compose } from 'ramda';

import dbConnect, { schema } from '../persistence/mysql';
import initServices from '../services';
import routes from '../routes';
import config from '../config';

export default (async function start() {
  const app = new Hapi.Server({
    host: config.get('server.hostname'),
    port: config.get('server.port'),
    debug: { request: ['error'] },
  });

  process.on('unhandledRejection', error => {
    app.log(['error'], error);
    process.exit(1);
  });

  const services = compose(initServices, schema, dbConnect)(config);

  try {
    routes().map(async route => await app.route(route({
      services,
      config,
    })));

    await app.start();
    console.log('Server running at:', app.info.uri); // eslint-disable-line
  } catch(error) {
    app.log(['error'], error);
    process.exit(1);
  }
})();
