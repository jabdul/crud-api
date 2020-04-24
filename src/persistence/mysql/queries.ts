import users from './User/queries';
import { Dict, DbClient } from 'src';

export default (client: DbClient): Dict => ({
  users: users(client),
});
