'use strict';
Object.defineProperty(exports, '__esModule', { value: true });
const create = async ({ db, payload, config /*, log */ }) => {
  const result = await db.users.create({
    payload: Object.assign({}, payload),
    config,
  });
  if (!result) {
    // log(['users', 'error', 'database'], result);
    throw Error(result);
  }
  return result;
};
exports.default = db => ({
  create: async ({ payload, config, log }) => await create({ db, payload, config, log }),
});
//# sourceMappingURL=services.js.map
