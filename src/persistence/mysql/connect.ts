import { Config } from "knex";

export default (config): Config => ({
  client: "mysql",
  connection: {
    host: config.get("mysql.host"),
    user: config.get("mysql.user"),
    password: config.get("mysql.pass"),
    database: config.get("mysql.database")
  }
});
