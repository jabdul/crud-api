import services from '../services';

describe('Services: users', () => {
  const user = {
    firstname: 'Bolatan',
    lastname: 'Ibrahim',
    email: 'bolatan.ibrahim@craftturf.com',
  };

  const json = jest.fn().mockReturnValue(() => user);

  describe('.create', () => {
    it('returns actual record for newly created user', async () => {
      const db = {
        users: {
          create: jest.fn().mockReturnValue(user),
        },
      };
      const users = services(db).users;
      const actual = await users.create({ payload: user, json });
      expect(actual).toEqual(user);
    });

    it('throws an error when new record creation fails', async () => {
      const db = {
        users: {
          create: jest.fn().mockReturnValue(false),
        },
      };
      const users = services(db).users;
      await expect(users.create({ payload: user, json })).rejects.toThrow();
      await expect(users.create({ payload: user, json })).rejects.toThrowError('false');
    });
  });
});
