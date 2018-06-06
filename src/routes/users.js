const options = {
  log: { collect: true }
};

export default ({ services: { users } }) => ({
  method: 'POST',
  path: '/users/',
  options,
  handler: async (request, h) => {
    request.log(['users'], 'Create new user');
    return h.response(await users.create(request.payload)).code(201);
  }
});
