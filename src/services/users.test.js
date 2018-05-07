import services from './';

describe('Services: users', () => {
  describe('.findAll', () => {
    const db = {
      users: {
        findAll: jest.fn().mockReturnValue('All users'),
      }
    };
    const users = services(db).users;

    it('returns all users', async () => {
      const actual = await users.findAll();
      expect(actual).toBe('All users');
    });
  });
});
