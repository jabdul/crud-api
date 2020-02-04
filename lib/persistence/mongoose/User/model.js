"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
<<<<<<< HEAD
exports.default = void 0;

var _mongoose = _interopRequireDefault(require("mongoose"));

var _uuid = _interopRequireDefault(require("uuid"));

const Schema = _mongoose.default.Schema;
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
  created: {
    type: Date,
    default: Date.now
  }
=======

var _mongoose = require('mongoose');

var _mongoose2 = _interopRequireDefault(_mongoose);

var _uuid = require('uuid');

var _uuid2 = _interopRequireDefault(_uuid);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var Schema = _mongoose2.default.Schema;

var UserSchema = new Schema({
  uuid: { type: String, default: _uuid2.default.v4 },
  firstname: { type: String, required: true },
  lastname: { type: String, required: true },
  created: { type: Date, default: Date.now }
>>>>>>> test findById
});

const User = _mongoose.default.model('Users', UserSchema);

var _default = User;
exports.default = _default;