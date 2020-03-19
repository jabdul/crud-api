import { Client } from "knex";
import connect from "./connect";
import queries from "./queries";

export const schema = client => queries(client);

export const close = (knex): Promise<void> => knex.destroy();

export default (config): Client => require("knex")(connect(config));
