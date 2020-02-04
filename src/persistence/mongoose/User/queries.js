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

export default client => ({
  create: async ({ payload, config }) => await create({ client, payload, config }),
});
