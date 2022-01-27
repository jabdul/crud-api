"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const connect_1 = __importDefault(require("./connect"));
const queries_1 = __importDefault(require("./queries"));
exports.schema = (client) => queries_1.default(client);
exports.close = (mongo) => mongo.disconnect();
exports.default = (config) => connect_1.default(mongoose_1.default, config);
//# sourceMappingURL=index.js.map