import Joi from 'joi';

const options = {
  log: { collect: true },
  validate: {
    payload: {
      firstname: Joi.string().min(2).max(64).required(),
      lastname: Joi.string().min(2).max(64),
    }
  },
};

export default ({ services: { users }, config }) => ({
  method: 'POST',
  path: '/users/',
  options,
  handler: async (request, h) => {
    request.log(['users'], 'Create new user');
    return h.response(await users.create({ payload: request.payload, config })).code(201);
  }
});
