import { ServiceArgs } from "src";

const create = async ({
  db,
  payload,
  config,
  uuid,
  json /*, log */
}: ServiceArgs): Promise<JSON> => {
  const uid = uuid();
  const result = await db.users.create({
    payload: { ...payload, uuid: uid },
    config
  });

  if (!result) {
    // log(['users', 'error', 'database'], result);
    throw Error(result);
  }
  // const {
  //   firstnam, last
  // }

  return json(result._doc).addLink("self", `/users/${uid}`);
};

export interface Services {
  create({ db, payload, config, json }: ServiceArgs): Promise<JSON>;
}

export default (db): Services => ({
  create: async ({ payload, config, uuid, json, log }: ServiceArgs) =>
    await create({ db, payload, config, uuid, json, log })
});
