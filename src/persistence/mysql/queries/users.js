const create = async ({ client, payload }) => {
  return await client.table('users').insert({
    uuid: payload.uuid,
    firstname: payload.firstname,
    lastname: payload.lastname
  }).returning('*');
};

export default client => ({
  create: async ({ payload, config }) => await create({ client, payload, config }),
});
