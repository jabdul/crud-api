'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _extends2 = require('babel-runtime/helpers/extends');

var _extends3 = _interopRequireDefault(_extends2);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var _create = async function _create(_ref) {
  var db = _ref.db,
      payload = _ref.payload,
      config = _ref.config,
      uuid = _ref.uuid,
      json = _ref.json;

  var uid = uuid();
  var result = await db.users.create({ payload: (0, _extends3.default)({}, payload, { uuid: uid }), config: config });

  if (!result) {
    // log(['users', 'error', 'database'], result);
    throw Error(result);
  }

  return json({}).addLink('self', '/users/' + uid);
};

exports.default = function (db) {
  return {
    create: async function create(_ref2) {
      var payload = _ref2.payload,
          config = _ref2.config,
          uuid = _ref2.uuid,
          json = _ref2.json,
          log = _ref2.log;
      return await _create({ db: db, payload: payload, config: config, uuid: uuid, json: json, log: log });
    }
  };
};