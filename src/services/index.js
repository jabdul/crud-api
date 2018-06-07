import users from './users/users';

export default db => ({
  users: users(db),
});
