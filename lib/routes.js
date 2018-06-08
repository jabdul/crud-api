'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _routes = require('./users/routes');

var _routes2 = _interopRequireDefault(_routes);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.default = function () {
  return [_routes2.default];
};