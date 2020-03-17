import application from '../bootstrap';
import { factory } from 'factory-girl';

import _ from '../../test/factories/user'; // eslint-disable-line no-unused-vars
import { ROUTE_NAME } from './routes';

let app = null;
const url =  `/${ROUTE_NAME}`

const parsedResponse = ({ payload }) => JSON.parse(payload);

describe('Users', () => {
  beforeAll(async () => {
    app = await application();
    await app.start();
  });

  afterAll(async () => {
    const db = await app.db;
    await db.disconnect();
    await app.stop({ timeout: 10 });
  });

  describe('Create', () => {
    it('Create User', async () => {
      const payload = await factory.attrs('User');
      const response = await app.inject({
        method: 'POST',
        url,
        payload
      });

      expect(response.statusCode).toBe(201);
      expect(response.statusMessage).toBe('Created');
      expect(response.headers['content-type']).toEqual('application/hal+json');

      const user = parsedResponse(response)
      expect(user).toHaveProperty('firstname')
      expect(user).toHaveProperty('lastname')
      expect(user).toHaveProperty('uuid')
      expect(user['firstname']).toEqual(payload['firstname'])
      expect(user['lastname']).toEqual(payload['lastname'])
      expect(user['uuid']).toMatch(
        /\b(?=([0-9A-F]{8})\b)\1-(?=([0-9A-F]{4}))\2-(?=(4[0-9A-F]{3}))\3-(?=([89AB][0-9A-F]{3}))\4-(?=([0-9A-F]{12}))\5\b/i // eslint-disable-line
      )
    })

    it('Cannot create User', async () => {
      
      const payload = await factory.attrs('User', { firstname: null });
      const response = await app.inject({
        method: 'POST',
        url,
        payload
      });

      expect(response.statusCode).toBe(400);
      expect(response.statusMessage).toBe('Bad Request');
      expect(response.headers['content-type']).toEqual('application/json; charset=utf-8');
    });
  });
});
