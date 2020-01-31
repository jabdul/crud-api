import User from './model';

const create = async ({ payload }) => {
  const user = new User();

  user.uuid = payload.uuid;
  user.firstname = payload.firstname;
  user.lastname = payload.lastname;

  return await user.save();
};

const findAll = async() => await User.find().lean();

const removeById = async ({ payload }) =>
  await User.updateOne(
    { _id: payload.uuid },
    {
      active: false,
    }
  );

export default client => ({
  create: async ({ payload, config }) => await create({ client, payload, config }),
  findAll: async () => await findAll({ client }),
  removeById: async ({ payload }) => await removeById({ payload })
});
