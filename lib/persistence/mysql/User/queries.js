"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

const create = async ({
  client,
  payload
}) => {
  const result = await client.table('users').insert({
    uuid: payload.uuid,
    firstname: payload.firstname,
    lastname: payload.lastname
  }).returning('*');
  return result.length && Number.isFinite(result[0]);
};

var _default = client => ({
  create: async ({
    payload,
    config
  }) => await create({
    client,
    payload,
    config
  })
});

exports.default = _default;