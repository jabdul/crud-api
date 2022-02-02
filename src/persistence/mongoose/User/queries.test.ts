import { factory } from 'factory-girl';

import '../../../../test/factories/user';
import queries from './queries';

import { mongooseConnect, dbConfig as config } from '../../../index';

let db, userQueries;

const verifyUser = (user): void => {
  expect(user).toHaveProperty('firstname');
  expect(user).toHaveProperty('lastname');
  expect(user).toHaveProperty('uuid');
};

const verifyResponse = ({ user, payload }): void => {
  expect(user['firstname']).toEqual(payload['firstname']);
  expect(user['lastname']).toEqual(payload['lastname']);
  expect(user['uuid']).toEqual(payload['uuid']);
  expect(user['meta.active']).toEqual(payload['meta.active']);
};

describe('Users queries', () => {
  beforeAll(async () => {
    db = await mongooseConnect(config);
    userQueries = queries(db);
  });

  afterAll(async () => {
    await db.disconnect();
  });

  describe('create', () => {
    it('can create a user', async () => {
      const payload = await factory.attrs('User');

      const user = await userQueries.create({ payload });

      expect(user).toBeDefined();

      expect(user).toHaveProperty('firstname');
      expect(user).toHaveProperty('lastname');
      expect(user).toHaveProperty('uuid');
      expect(user['firstname']).toEqual(payload['firstname']);
      expect(user['lastname']).toEqual(payload['lastname']);
    });

    it('cannot create a user', async () => {
      const payload = await factory.attrs('User', { firstname: undefined });

      try {
        await expect(await (async () => userQueries.create({ payload }))()).resolves.toThrow();
      } catch ({ errors, name, message }) {
        expect(name).toBe('ValidationError');
        expect(message).toMatch(/`firstname` is required/);
        expect(errors).toHaveProperty('firstname');
        expect(errors['firstname']['path']).toBe('firstname');
        expect(errors['firstname']['kind']).toBe('required');
      }
    });
  });

  describe('findById', () => {
    it('can find a single user', async () => {
      const user = await factory.create('User');

      const findUser = await userQueries.findById({
        payload: { uuid: user.uuid },
      });

      expect(findUser).toBeDefined();
      verifyUser(findUser);

      verifyResponse({ user: findUser, payload: user });
    });

    it('should not find a user with an invalid uuid', async () => {
      const uuid = '02117187-a5d5-4681-b087-8b4b337d5b8d';
      const res = await userQueries.findById({ payload: { uuid: uuid } });
      expect(res).toBe(null);
    });
  });

  describe('updateById', () => {
    it('update a single user', async () => {
      const user = await factory.create('User');
      const updateUser = await userQueries.updateById({
        payload: { uuid: user.uuid, firstname: 'Micah', lastname: 'Joel' },
      });

      expect(updateUser).toBeDefined();
      expect(updateUser).toHaveProperty('acknowledged');
      expect(updateUser).toHaveProperty('modifiedCount');
      expect(updateUser).toHaveProperty('matchedCount');
      expect(updateUser['acknowledged']).toEqual(true);
      expect(updateUser['modifiedCount']).toEqual(1);
      expect(updateUser['matchedCount']).toEqual(1);

      const findOneUser = await userQueries.findById({
        payload: { uuid: user.uuid },
      });

      expect(findOneUser).toBeDefined();
      verifyUser(findOneUser);
      expect(findOneUser.meta).toHaveProperty('updated');
    });

    it('should not update a user with an invalid uuid', async () => {
      const uuid = '84b5eaa1-bcb0-4107-a082-75156bb6c56a';

      const res = await userQueries.updateById({
        payload: { uuid, firstname: 'Wendy', lastname: 'Mcmanaman' },
      });

      expect(res.meta).toBeUndefined();

      const findOneUser = await userQueries.findById({
        payload: { uuid: uuid },
      });

      expect(findOneUser).toBeNull();
    });
  });
});
