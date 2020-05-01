import mysqlDb, { close } from './';

import config from '../../config';

jest.mock('knex', () =>
  jest.fn().mockReturnValue({
    schema: { hasTable: jest.fn().mockReturnValue(true) },
    destroy: jest.fn(),
  })
);

jest.mock('../../config', () => ({
  __esModule: true,
  default: jest.fn(),
}));

jest.mock('./connect', () => ({
  __esModule: true,
  default: jest.fn().mockReturnValue({ client: 'mysql' }),
}));

describe('mysqlDb', () => {
  describe('.connect', () => {
    it('connects to mysql database', async () => {
      const db = mysqlDb(config({}, {}, {}));
      const actual = await db.schema.hasTable('users');

      expect(actual).toBe(true);
      // node process won't exit while sockets are still connected
      close(db);
    });
  });
});
