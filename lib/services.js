"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _services = _interopRequireDefault(require("./users/services"));

var _default = db => ({
  users: (0, _services.default)(db)
});

exports.default = _default;