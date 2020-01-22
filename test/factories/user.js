import { factory } from 'factory-girl';

import User from '../../src/persistence/mongoose/User/model'

export default factory.define('User', User, {
  firstName: 'test',
  lastName: 'Test'
});
