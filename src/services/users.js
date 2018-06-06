import uuid from 'uuid';

export default db => ({
  create: async payload => {
    const uid = uuid();
    return await db.users.create({ ...payload, uuid: uid });
  },
});
