import users from "./users/services";
import { Dict } from "src";

export default (db): Dict => ({
  users: users(db)
});
