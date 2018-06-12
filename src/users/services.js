import uuid from 'uuid';
import halson from 'halson';

const create = async ({ db, payload, config }) => {
  const uid = uuid();
  const result = await db.users.create({ payload: { ...payload, uuid: uid }, config });

  if (!result) throw Error('Could not create record');

  return halson({}).addLink('self', `/users/${uid}`);
};

export default db => ({
  create: async ({ payload, config }) => await create({ db, payload, config }),
});
