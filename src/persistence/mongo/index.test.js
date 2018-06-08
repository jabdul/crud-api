import mongoDb, { close } from './';

import config from '../../config';

describe('mongoDb', () => {
  describe('.connect', () => {
    it('connects to mongodb', async () => {
      const mongo = await mongoDb(config);
      close(mongo);
    });
  });
});
