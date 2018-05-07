 // import uuid from 'uuid';

export default db => ({
  // create: async () => await db.users.create()
  create: async (request) => await db.users.create(request),
});
