import mysqlDb, { close } from './';

describe('mysqlDb', () => {
  describe('.connect', () => {
    it('connects to mysql database', async () => {
      const db = mysqlDb({
        client: 'mysql',
        connection: {
          host: 'localhost',
          user: 'root',
          password: 'root',
          database: 'mysql',
        }
      });
      const actual = await db.schema.hasTable('proc');

      expect(actual).toBe(true);
      // node process won't exit while sockets are still connected
      close(db);
    });
  });
});
