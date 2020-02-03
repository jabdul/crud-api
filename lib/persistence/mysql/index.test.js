"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

var _interopRequireWildcard = require("@babel/runtime/helpers/interopRequireWildcard");

var _ = _interopRequireWildcard(require("./"));

var _config = _interopRequireDefault(require("../../config"));

describe('mysqlDb', () => {
  describe('.connect', () => {
    it.skip('connects to mysql database', async () => {
      const db = (0, _.default)(_config.default);
      const actual = await db.schema.hasTable('users');
      expect(actual).toBe(true); // node process won't exit while sockets are still connected

      (0, _.close)(db);
    });
  });
});