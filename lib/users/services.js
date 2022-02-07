"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const json_1 = __importDefault(require("./json"));
const create = async ({ db, payload, config, json }) => {
    const result = await db.users.create({
        payload: Object.assign({}, payload),
        config,
    });
    if (!result) {
        // log(['users', 'error', 'database'], result);
        throw Error(result);
    }
    return json(json_1.default)(result);
};
exports.default = (db) => ({
    create: async ({ payload, config, json }) => await create({ db, payload, config, json }),
});
//# sourceMappingURL=services.js.map