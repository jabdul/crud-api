import users from "./User/queries";

export default client => ({
  users: users(client)
});
