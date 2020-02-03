import { pickBy, omit } from 'ramda';

import User from './model';

const create = async ({ payload }) => {
  const user = new User();

  user.uuid = payload.uuid;
  user.firstname = payload.firstname;
  user.lastname = payload.lastname;

  return await user.save();
};

const findById = async ({ payload }) => User.findOne({ uuid: payload });

const updateById = async ({ payload }) => User.updateOne(
  { uuid: payload },
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
