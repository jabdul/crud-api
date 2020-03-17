export default config => ({
  client: "mysql",
  connection: {
    host: config.get("mysql.host"),
    user: config.get("mysql.user"),
    password: config.get("mysql.pass"),
    database: config.get("mysql.database")
  }
});
