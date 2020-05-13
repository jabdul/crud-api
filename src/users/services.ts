import { ServiceArgs, Crud, Dict } from '../';

const create = async ({ db, payload, config, uuid, json /*, log */ }: ServiceArgs): Promise<JSON> => {
  const uid = uuid();
  const result = await db.users.create({
    payload: { ...payload, uuid: uid },
    config,
  });

  if (!result) {
    // log(['users', 'error', 'database'], result);
    throw Error(result);
  }

  return json(result._doc).addLink('self', `/users/${uid}`);
};

export default (db: Dict): Crud<JSON> => ({
  create: async ({ payload, config, uuid, json, log }: ServiceArgs) =>
    await create({ db, payload, config, uuid, json, log }),
});
