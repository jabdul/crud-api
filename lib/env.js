"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

var _dotenv = _interopRequireDefault(require("dotenv"));

if (process.env.NODE_ENV !== 'test') {
  _dotenv.default.config({
    silent: true
  });
}