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
      } catch (e) {
        expect(e.message).toMatch(/`firstname` is required/);
      }

    })
  })
})