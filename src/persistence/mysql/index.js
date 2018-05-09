// Replace with dependency injection
// in later iteration.
import config from '../../config';

export const schema = client => ({
  users: {
    create: async () => {
      return await client.table('users').insert({
        uuid: 'oyureq-qeyr-qlejh-qerjh',
        firstname: 'Abiodun',
        lastname: 'Abdul'
      }).returning('*');
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
