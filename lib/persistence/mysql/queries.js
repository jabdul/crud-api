"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _queries = _interopRequireDefault(require("./User/queries"));

var _default = client => ({
  users: (0, _queries.default)(client)
});

exports.default = _default;