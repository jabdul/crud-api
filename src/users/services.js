import uuid from 'uuid';

const create = async ({ db, payload, config }) => {
  const uid = uuid();
  return await db.users.create({ payload: { ...payload, uuid: uid }, config });
};

export default db => ({
  create: async ({ payload, config }) => await create({ db, payload, config }),
});
