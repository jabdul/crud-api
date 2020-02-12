import { factory } from 'factory-girl';

import UserFactory from '../../../../test/factories/user'; // eslint-disable-line no-unused-vars
import queries from './queries'

import { mongooseConnect, config } from '../../../index';

const db = mongooseConnect(config);
let userQueries = queries(db); // eslint-disable-line no-unused-vars

describe('Users queries', () => {

  describe('create', () => {
    it('can create a user', async () => {
      const payload = await factory.attrs('User');

      const user = await userQueries.create({ payload });

      expect(user).toBeDefined()

      expect(user).toHaveProperty('firstname')
      expect(user).toHaveProperty('lastname')
      expect(user).toHaveProperty('uuid')
      expect(user['firstname']).toEqual(payload['firstname'])
      expect(user['lastname']).toEqual(payload['lastname'])
    });

    it('cannot create a user', async () => {
      const payload = await factory.attrs('User', { firstname: undefined });

      try {
        await expect(
          await (async () => userQueries.create({ payload }))(),
        ).resolves.toThrow();
      } catch ({ errors, name, message }) {
        expect(name).toBe('ValidationError');
        expect(message).toMatch(/`firstname` is required/);
        expect(errors).toHaveProperty('firstname')
        expect(errors['firstname']['path']).toBe('firstname');
        expect(errors['firstname']['kind']).toBe('required');
      }

    })
  })

  describe('findById', () => {
    it('can find a single user', async () => {
      const user = await factory.create('User');

      const findUser = await userQueries.findById({ payload: { uuid: user.uuid } });

      expect(findUser).toBeDefined();
      expect(findUser).toHaveProperty('uuid');
      expect(findUser.uuid['uuid']).toEqual(user.uuid['uuid']);
      expect(findUser['firstname']).toEqual(user['firstname']);
      expect(findUser['lastname']).toEqual(user['lastname']);
      expect(findUser['meta.active']).toEqual(user['meta.active'])
    });

    it('should not find a user with an invalid uuid', async () => {
      const uuid = '02117187-a5d5-4681-b087-8b4b337d5b8d';
      const res = await userQueries.findById({ payload: { uuid: uuid } });
      expect(res).toBe(null);

    })
  })

  describe('updateById', () => {
    it('update a single user', async () => {
      const user = await factory.create('User');
      const updateUser = await userQueries.updateById({ payload: { uuid: user.uuid, firstname: 'Micah', lastname: 'Joel' } });

      expect(updateUser).toBeDefined()
      expect(updateUser).toHaveProperty('nModified');
      expect(updateUser).toHaveProperty('n');
      expect(updateUser).toHaveProperty('ok');
      expect(updateUser['nModified']).toEqual(1);
      expect(updateUser['n']).toEqual(1);
      expect(updateUser['ok']).toEqual(1);

      const findOneUser = await userQueries.findById({ payload: { uuid: user.uuid } });

      expect(findOneUser).toBeDefined()
      expect(findOneUser).toHaveProperty('firstname');
      expect(findOneUser).toHaveProperty('lastname');
      expect(findOneUser).toHaveProperty('uuid');
      expect(findOneUser.meta).toHaveProperty('active', true);
      expect(findOneUser.meta).toHaveProperty('updated');
    });

    it('should not update a user with an invalid uuid', async () => {

      const uuid = '84b5eaa1-bcb0-4107-a082-75156bb6c56a';

      const res = await userQueries.updateById({ payload: { uuid, firstname: 'Wendy', lastname: 'Mcmanaman' } });

      expect(res.meta).toBeUndefined()

      const findOneUser = await userQueries.findById({ payload: { uuid: uuid } });

      expect(findOneUser).toBeNull()
    })
  }
  )
});
