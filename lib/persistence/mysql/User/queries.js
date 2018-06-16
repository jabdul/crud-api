'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _isFinite = require('babel-runtime/core-js/number/is-finite');

var _isFinite2 = _interopRequireDefault(_isFinite);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var _create = async function _create(_ref) {
  var client = _ref.client,
      payload = _ref.payload;

  var result = await client.table('users').insert({
    uuid: payload.uuid,
    firstname: payload.firstname,
    lastname: payload.lastname
  }).returning('*');

  return result.length && (0, _isFinite2.default)(result[0]);
};

exports.default = function (client) {
  return {
    create: async function create(_ref2) {
      var payload = _ref2.payload,
          config = _ref2.config;
      return await _create({ client: client, payload: payload, config: config });
    }
  };
};