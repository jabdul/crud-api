import Joi from 'joi';

export const ROUTE_NAME = 'users';

const options = {
  log: { collect: true },
  validate: {
    payload: {
      firstname: Joi.string().min(2).max(64).required(),
      lastname: Joi.string().min(2).max(64),
    }
  },
};

export default ({ services, config }) => ({
  method: 'POST',
  path: `/${ROUTE_NAME}/`,
  options,
  handler: async (request, h) => {
    request.log([`/${ROUTE_NAME}/`], 'Create new user');
    return h.response(await services[ROUTE_NAME]
      .create({ payload: request.payload, config }))
      .code(201)
      .type('application/hal+json');
  }
});
