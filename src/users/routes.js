export const ROUTE_NAME = 'users';

const options = {
  log: { collect: true },
};

export default ({ services, config, validate, uuid, json }) => ({
  method: 'POST',
  path: `/${ROUTE_NAME}/`,
  options: {
    ...options, validate: {
      payload: {
        firstname: validate.string().min(2).max(64).required(),
        lastname: validate.string().min(2).max(64),
      },
    },
    tags: ['api'],
  },
  handler: async (request, h) => {
    request.log([`/${ROUTE_NAME}/`], 'Create new user');
    return h.response(await services[ROUTE_NAME]
      .create({ payload: request.payload, config, uuid, json, log: request.log }))
      .code(201)
      .type('application/hal+json');
  }
});
