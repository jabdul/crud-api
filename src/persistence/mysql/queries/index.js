import users from './users';

export default client => ({
  users: users(client),
});
