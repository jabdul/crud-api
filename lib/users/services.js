'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _extends2 = require('babel-runtime/helpers/extends');

var _extends3 = _interopRequireDefault(_extends2);

var _uuid = require('uuid');

var _uuid2 = _interopRequireDefault(_uuid);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var _create = async function _create(_ref) {
  var db = _ref.db,
      payload = _ref.payload,
      config = _ref.config;

  var uid = (0, _uuid2.default)();
  return await db.users.create({ payload: (0, _extends3.default)({}, payload, { uuid: uid }), config: config });
};

exports.default = function (db) {
  return {
    create: async function create(_ref2) {
      var payload = _ref2.payload,
          config = _ref2.config;
      return await _create({ db: db, payload: payload, config: config });
    }
  };
};