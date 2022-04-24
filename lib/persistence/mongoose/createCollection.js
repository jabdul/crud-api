'use strict';
Object.defineProperty(exports, '__esModule', { value: true });
exports.default = async dbConnection => {
  try {
    await Promise.all(Object.values(dbConnection.models).map(async model => model.createCollection()));
  } catch (error) {
    console.error(error);
  }
  return dbConnection;
};
//# sourceMappingURL=createCollection.js.map
