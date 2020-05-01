import users from './users/services';
import { Dict } from 'src';

export default (db: Dict): Dict => ({
  users: users(db),
});
