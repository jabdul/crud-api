import { factory } from 'factory-girl';

import { MetaSchema } from '../../src/persistence/mongoose/User/model';

export default factory.define('Meta', MetaSchema, {
  active: true,
  updated: Date,
  created: Date
});