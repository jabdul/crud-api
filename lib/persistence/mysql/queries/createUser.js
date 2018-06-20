'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

exports.default = async function (_ref) {
  var client = _ref.client,
      payload = _ref.payload;

  return await client.table('users').insert({
    uuid: payload.uuid,
    firstname: payload.firstname,
    lastname: payload.lastname
  }).returning('*');
};