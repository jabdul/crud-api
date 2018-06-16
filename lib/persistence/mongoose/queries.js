'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _queries = require('./User/queries');

var _queries2 = _interopRequireDefault(_queries);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.default = function (client) {
  return {
    users: (0, _queries2.default)(client)
  };
};