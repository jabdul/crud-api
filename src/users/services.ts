import { ServiceArgs, Crud, Dict } from '../';
import jsonSchema from './json';

const create = async ({ db, payload, config, json }: ServiceArgs): Promise<string> => {
  const result = await db.users.create({
    payload: { ...payload },
    config,
  });

  if (!result) {
    // log(['users', 'error', 'database'], result);
    throw Error(result);
  }

  return json(jsonSchema)(result);
};

export default (db: Dict): Crud<string> => ({
  create: async ({ payload, config, json }: ServiceArgs): Promise<string> =>
    await create({ db, payload, config, json }),
});
