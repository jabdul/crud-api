import { ServiceArgs, Crud, Dict } from '../';

const create = async ({ db, payload, config /*, log */ }: ServiceArgs): Promise<JSON> => {
  const result = await db.users.create({
    payload: { ...payload },
    config,
  });

  if (!result) {
    // log(['users', 'error', 'database'], result);
    throw Error(result);
  }

  return result;
};

export default (db: Dict): Crud<JSON> => ({
  create: async ({ payload, config, log }: ServiceArgs) => await create({ db, payload, config, log }),
});
