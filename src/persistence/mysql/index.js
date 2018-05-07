// Replace with dependency injection
// in later iteration.
import config from '../../config';

export const schema = client => ({
  users: {
    create: async (params = {}) => {
      const p = { ...params };
      console.log(client);
      await client.table('users').insert(p).returning('*');
    },
  }
});

const connection = {
  client: 'mysql',
  connection: {
    host: config.get('mysql.host'),
    user: config.get('mysql.user'),
    password: config.get('mysql.pass'),
    database: config.get('mysql.database'),
  }
};

export const close = knex => knex.destroy();

export default (connect = connection) => require('knex')(connect);
