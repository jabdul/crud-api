import users from "./User/queries";

export default (client): any => ({
  users: users(client)
});
