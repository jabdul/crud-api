import connect from './connect';
import createUser from './queries/createUser';

export const schema = client => ({
  users: {
    create: async payload => await createUser({ client, payload }),
  }
});

export const close = knex => knex.destroy();

export default config => require('knex')(connect(config));
