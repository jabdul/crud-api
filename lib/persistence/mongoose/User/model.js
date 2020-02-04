"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = exports.MetaSchema = void 0;

var _mongoose = _interopRequireDefault(require("mongoose"));

var _uuid = _interopRequireDefault(require("uuid"));

const Schema = _mongoose.default.Schema;
const MetaSchema = new Schema({
  active: {
    type: Boolean,
    default: true
  },
  updated: {
    type: Date
  },
  created: {
    type: Date
  }
}, {
  _id: false
});
exports.MetaSchema = MetaSchema;
const UserSchema = new Schema({
  uuid: {
    type: String,
    default: _uuid.default.v4
  },
  firstname: {
    type: String,
    required: true
  },
  lastname: {
    type: String,
    required: true
  },
  meta: {
    type: MetaSchema
  }
});

const User = _mongoose.default.model('Users', UserSchema);

var _default = User;
exports.default = _default;