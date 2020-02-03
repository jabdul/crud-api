"use strict";

var _interopRequireWildcard = require("@babel/runtime/helpers/interopRequireWildcard");

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

var _mongoose = _interopRequireDefault(require("mongoose"));

var _ = _interopRequireWildcard(require("./"));

var _config = _interopRequireDefault(require("../../config"));

describe('mongoose', () => {
  describe('.connect', () => {
    it.skip('connects to mongodb', async () => {
      const mongoose = await (0, _.default)(_config.default);
      expect(mongoose).toEqual(_mongoose.default);
      (0, _.close)(mongoose);
    });
  });
});