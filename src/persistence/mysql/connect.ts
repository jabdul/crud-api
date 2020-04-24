import { Config as KnexConfig } from 'knex';
import { Config } from 'convict';

export default (config: Config<object>): KnexConfig => ({
  client: 'mysql',
  connection: {
    host: config.get('mysql.host'),
    user: config.get('mysql.user'),
    password: config.get('mysql.pass'),
    database: config.get('mysql.database'),
  },
});
