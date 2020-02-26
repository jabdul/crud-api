import { pickBy, omit } from 'ramda';

import User from './model';

const create = async ({ payload }) => {
  const user = new User();

  const { uuid, firstname, lastname, meta } = payload;
  user.uuid = uuid;
  user.firstname = firstname;
  user.lastname = lastname;
  user.meta = meta
  
  return await user.save();
};

const findById = async ({ payload }) => User.findOne({ uuid: payload.uuid });

const updateById = async ({ payload }) => User.updateOne(
  { uuid: payload.uuid },
  {
    $set: {
      ...pickBy(val => val !== undefined, {
        ...omit('uuid', payload)
      }),
      'meta.updated': Date.now()
    }
  }
);

export default client => ({
  create: async ({ payload, config }) => await create({ client, payload, config }),
  findById: async ({ payload, config }) => await findById({ client, payload, config }),
  updateById: async ({ payload, config }) => await updateById({ client, payload, config })
});
