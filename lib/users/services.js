'use strict';
Object.defineProperty(exports, '__esModule', { value: true });
const create = async ({ db, payload, config }) => {
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
  create: async ({ payload, config }) => await create({ db, payload, config }),
});
//# sourceMappingURL=services.js.map
