"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const connect_1 = __importDefault(require("./connect"));
const queries_1 = __importDefault(require("./queries"));
exports.schema = client => queries_1.default(client);
exports.close = knex => knex.destroy();
exports.default = config => require('knex')(connect_1.default(config));
