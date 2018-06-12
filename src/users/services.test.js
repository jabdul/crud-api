import services from '../services';

describe('Services: users', () => {
  describe('.create', () => {
    const hal = {"_links": {"self": {"href": "/users/dfa7fd57-5d6b-4563-b60e-6c9f78f19579"}}}; // eslint-disable-line
    const db = {
      users: {
        create: jest.fn().mockReturnValue(hal),
      }
    };
    const users = services(db).users;

    it.skip('returns record id of newly created user', async () => {
      const actual = await users.create({});
      expect(actual).toEqual(hal);
    });
  });
});
