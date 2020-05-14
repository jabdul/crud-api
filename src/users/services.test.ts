import services from '../services';

describe('Services: users', () => {
  const user = {
    firstname: 'Bolatan',
    lastname: 'Ibrahim',
    email: 'bolatan.ibrahim@craftturf.com',
  };
  describe('.create', () => {
    it('returns actual record for newly created user', async () => {
      const db = {
        users: {
          create: jest.fn().mockReturnValue(user),
        },
      };
      const users = services(db).users;
      const actual = await users.create({ payload: user });
      expect(actual).toEqual(user);
    });

    it('throws an error when new record creation fails', async () => {
      const db = {
        users: {
          create: jest.fn().mockReturnValue(false),
        },
      };
      const log = jest.fn();
      const users = services(db).users;
      await expect(users.create({ log, payload: user })).rejects.toThrow();
      await expect(users.create({ log, payload: user })).rejects.toThrowError('false');
    });
  });
});
