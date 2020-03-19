import { pickBy, omit } from "ramda";

import User, { UserI } from "./model";
import { QueryArgs } from "src";

const create = async ({ payload }: QueryArgs): Promise<UserI> => {
  const user = new User();

  const { uuid, firstname, lastname, meta } = payload;
  user.uuid = uuid;
  user.firstname = firstname;
  user.lastname = lastname;
  user.meta = meta;

  return await user.save();
};

const findById = async ({ payload }: QueryArgs): Promise<UserI> =>
  User.findOne({ uuid: payload.uuid });

const updateById = async ({ payload }: QueryArgs): Promise<object> =>
  User.updateOne(
    { uuid: payload.uuid },
    {
      $set: {
        ...pickBy(val => val !== undefined, {
          ...omit("uuid", payload)
        }),
        "meta.updated": Date.now()
      }
    }
  );

export default client => ({
  create: async ({ payload, config }: QueryArgs) =>
    await create({ client, payload, config }),
  findById: async ({ payload, config }: QueryArgs) =>
    await findById({ client, payload, config }),
  updateById: async ({ payload, config }: QueryArgs) =>
    await updateById({ client, payload, config })
});
