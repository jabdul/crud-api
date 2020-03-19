import { SchemaBuilder } from "knex";
import connect from "./connect";
import queries from "./queries";

export const schema = (client): any => queries(client);

export const close = (knex): Promise<void> => knex.destroy();

// eslint-disable-next-line @typescript-eslint/no-var-requires
export default (config): SchemaBuilder => require("knex")(connect(config));
