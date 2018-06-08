'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _services = require('./users/services');

var _services2 = _interopRequireDefault(_services);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.default = function (db) {
  return {
    users: (0, _services2.default)(db)
  };
};