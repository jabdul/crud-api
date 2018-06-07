import uuid from 'uuid';

const create = async (db, payload) => {
  const uid = uuid();
  return await db.users.create({ ...payload, uuid: uid });
};

export default db => ({
  create: async payload => await create(db, payload),
});
