"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const ramda_1 = require("ramda");
const model_1 = __importDefault(require("./model"));
const create = async ({ payload }) => {
    const user = new model_1.default();
    const { uuid, firstname, lastname, meta } = payload;
    user.uuid = uuid;
    user.firstname = firstname;
    user.lastname = lastname;
    user.meta = meta;
    return await user.save();
};
const findById = async ({ payload }) => model_1.default.findOne({ uuid: payload.uuid });
const updateById = async ({ payload }) => model_1.default.updateOne({ uuid: payload.uuid }, {
    $set: Object.assign(Object.assign({}, ramda_1.pickBy(val => val !== undefined, Object.assign({}, ramda_1.omit("uuid", payload)))), { "meta.updated": Date.now() })
});
exports.default = client => ({
    create: async ({ payload, config }) => await create({ client, payload, config }),
    findById: async ({ payload, config }) => await findById({ client, payload, config }),
    updateById: async ({ payload, config }) => await updateById({ client, payload, config })
});
