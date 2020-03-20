import users from "./User/queries";
import { Dict } from "src";

export default (client): Dict => ({
  users: users(client)
});
