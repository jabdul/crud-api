import users from "./users/services";

export default (db): any => ({
  users: users(db)
});
