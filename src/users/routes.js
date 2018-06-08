const options = {
  log: { collect: true }
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
