"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

const create = async ({
  db,
  payload,
  config,
  uuid,
  json
  /*, log */

}) => {
  const uid = uuid();
  const result = await db.users.create({
    payload: { ...payload,
      uuid: uid
    },
    config
  });

  if (!result) {
    // log(['users', 'error', 'database'], result);
    throw Error(result);
  }

  return json({}).addLink('self', `/users/${uid}`);
};

var _default = db => ({
  create: async ({
    payload,
    config,
    uuid,
    json,
    log
  }) => await create({
    db,
    payload,
    config,
    uuid,
    json,
    log
  })
});

exports.default = _default;