import users from './users/services';
import { Dict } from './';

export default (db: Dict): Dict => ({
  users: users(db),
});
