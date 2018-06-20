import Mongoose from 'mongoose';

import dbConnect, { close } from './';
import config from '../../config';

describe('mongoose', () => {
  describe('.connect', () => {
    it.skip('connects to mongodb', async () => {
      const mongoose = await dbConnect(config);

      expect(mongoose).toEqual(Mongoose);
      close(mongoose);
    });
  });
});
