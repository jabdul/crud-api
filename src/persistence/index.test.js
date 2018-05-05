import mysqlDb, { close } from './';

import config from '../config';

// console.log(config.get('mysql'));

describe('mysqlDb', () => {
  describe('.connect', () => {
    it('connects to mysql database', async () => {
      const db = mysqlDb({
        client: 'mysql',
        connection: {
          host: config.get('mysql.host'),
          user: config.get('mysql.user'),
          password: config.get('mysql.pass'),
          database: config.get('mysql.database'),
        }
      });
      const actual = await db.schema.hasTable('proc');

      expect(actual).toBe(true);
      // node process won't exit while sockets are still connected
      close(db);
    });
  });
});
