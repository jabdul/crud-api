"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = (config) => async (dbConnection) => {
    const dbConnectOptions = config.has('dbModifiers') ? config.get('dbModifiers') : { createIndex: true };
    try {
        if (dbConnectOptions.createIndex)
            await Promise.allSettled(Object.values(dbConnection.models).map(async (model) => model.ensureIndexes()));
    }
    catch (error) {
        console.error(error);
    }
    return dbConnection;
};
//# sourceMappingURL=createIndex.js.map