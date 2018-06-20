'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _extends2 = require('babel-runtime/helpers/extends');

var _extends3 = _interopRequireDefault(_extends2);

var _uuid = require('uuid');

var _uuid2 = _interopRequireDefault(_uuid);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.default = function (db) {
  return {
    create: async function create(payload) {
      var uid = (0, _uuid2.default)();
      return await db.users.create((0, _extends3.default)({}, payload, { uuid: uid }));
    }
  };
};