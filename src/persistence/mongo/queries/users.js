import { promisify } from 'util';

const create = async ({ client, payload, config }) => {
  console.log('CLIENT', client); // eslint-disable-line
  const db = await client.db(config.get('mongo.database'));

  return promisify(db.collection('inserts').insertOne)({
    uuid: payload.uuid,
    firstname: payload.firstname,
    lastname: payload.lastname
  });
};

export default client => ({
  create: async (payload, config) => await create({ client, payload, config }),
});
