import User from './model';

const create = async ({ payload }) => {
  const user = new User();

  user.uuid = payload.uuid;
  user.firstname = payload.firstname;
  user.lastname = payload.lastname;

  return await user.save();
};

const findById = async ({ payload }) => User.findOne({ uuid: payload.uuid, 'meta.active': { $gte: true } });


export default client => ({
  create: async ({ payload, config }) => await create({ client, payload, config }),
  findById: async ({ payload }) => findById({ payload })
});
