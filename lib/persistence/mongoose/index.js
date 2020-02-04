"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = exports.close = exports.schema = void 0;

var _mongoose = _interopRequireDefault(require("mongoose"));

var _connect = _interopRequireDefault(require("./connect"));

var _queries = _interopRequireDefault(require("./queries"));

const schema = client => (0, _queries.default)(client);

exports.schema = schema;

const close = mongo => mongo.disconnect();

exports.close = close;

var _default = async config => await (0, _connect.default)(_mongoose.default, config);

exports.default = _default;