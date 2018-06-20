import User from './model';

const create = async ({ payload }) => {
  const user = new User();

  user.uuid = payload.uuid;
  user.firstname = payload.firstname;
  user.lastname = payload.lastname;

  return await user.save();
};

export default client => ({
  create: async ({ payload, config }) => await create({ client, payload, config }),
});
