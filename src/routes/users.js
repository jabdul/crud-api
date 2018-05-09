const options = {
  log: { collect: true }
};

async function create(request, { users }) {
  return await users.create(request);
}

export default ({ services }) => ({
  method: 'POST',
  path: '/users/',
  options,
  handler: async (request, h) => {
    request.log(['users'], 'Create new user');
    return h.response(await create(request, services)).code(201);
  }
});
