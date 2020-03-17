import connect from "./connect";
import queries from "./queries";

export const schema = client => queries(client);

export const close = knex => knex.destroy();

export default config => require("knex")(connect(config));
