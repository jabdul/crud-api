const create = async ({ db, payload, config, uuid, json/*, log */ }) => {
  const uid = uuid();
  const result = await db.users.create({ payload: { ...payload, uuid: uid }, config });

  if (!result) {
    // log(['users', 'error', 'database'], result);
    throw Error(result);
  }

  return json({}).addLink('self', `/users/${uid}`);
};

export default db => ({
  create: async ({ payload, config, uuid, json, log }) => await create({ db, payload, config, uuid, json, log }),
});
