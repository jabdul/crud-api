import mysqlDb, { close } from "./";

import config from "../../config";

describe("mysqlDb", () => {
  describe(".connect", () => {
    it.skip("connects to mysql database", async () => {
      const db = mysqlDb(config);
      const actual = await db.schema.hasTable("users");

      expect(actual).toBe(true);
      // node process won't exit while sockets are still connected
      close(db);
    });
  });
});
