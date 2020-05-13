import users from './User/queries';
import { Dict, DbClient } from '../../';

export default (client: DbClient): Dict => ({
  users: users(client),
});
