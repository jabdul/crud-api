import services from '../services';

describe('Services: users', () => {
  describe('.create', () => {
    const db = {
      users: {
        create: jest.fn().mockReturnValue([1]),
      }
    };
    const users = services(db).users;

    it('returns record id of newly created user', async () => {
      const actual = await users.create();
      expect(actual).toEqual([1]);
    });
  });
});
