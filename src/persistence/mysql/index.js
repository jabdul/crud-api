import connect from './connect';

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

export const close = knex => knex.destroy();

export default config => require('knex')(connect(config));
