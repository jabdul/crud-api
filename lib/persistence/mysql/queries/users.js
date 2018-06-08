'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
var _create = async function _create(_ref) {
  var client = _ref.client,
      payload = _ref.payload;

  return await client.table('users').insert({
    uuid: payload.uuid,
    firstname: payload.firstname,
    lastname: payload.lastname
  }).returning('*');
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