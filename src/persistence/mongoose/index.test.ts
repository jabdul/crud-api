import Mongoose from 'mongoose';

import dbConnect, { close } from '.';
import { dbConfig as config } from '../../config';

describe('mongoose', () => {
  describe('.connect', () => {
    it('connects to mongodb', async () => {
      const mongoose = await dbConnect(config);

      expect(mongoose).toEqual(Mongoose);
      close(mongoose);
    });
  });
});
