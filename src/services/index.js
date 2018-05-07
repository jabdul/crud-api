import users from './users';

export default db => ({
  users: users(db),
});
