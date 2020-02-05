import application from '../bootstrap';
import { factory } from 'factory-girl';

import UserFactory from '../../test/factories/user'; // eslint-disable-line no-unused-vars
import { ROUTE_NAME } from './routes';

let app = null;
const url =  `/${ROUTE_NAME}`

describe('Users', () => {
  beforeAll(async () => {
    app = await application();
    await app.start();
  });

  describe('Create', () => {
    it('Create User', async () => {
      const payload = await factory.attrs('User', { meta: null });
      const response = await app.inject({
        method: 'POST',
        url,
        payload
      });

      expect(response.statusCode).toBe(201);
      console.log(response) // eslint-disable-line no-console
    })
  })
});
