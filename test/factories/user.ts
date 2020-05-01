import { factory } from 'factory-girl';

import User from '../../src/persistence/mongoose/User/model'
import './meta';

export default factory.define('User', User, {
  firstname: 'test',
  lastname: 'Test',
  meta: factory.assocAttrs('Meta')
});
