import users from './users/services';

export default db => ({
  users: users(db),
});
