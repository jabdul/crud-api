"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.dbConfig = exports.config = exports.mongooseConnect = exports.mysqlConnect = exports.server = void 0;
const config_1 = __importStar(require("./config"));
Object.defineProperty(exports, "dbConfig", { enumerable: true, get: function () { return config_1.dbConfig; } });
const server_1 = __importDefault(require("./server"));
const mysql_1 = __importDefault(require("./persistence/mysql"));
exports.mysqlConnect = mysql_1.default;
const mongoose_1 = __importDefault(require("./persistence/mongoose"));
exports.mongooseConnect = mongoose_1.default;
const server = async ({ dbConnect, schema, serverOptions, config, configOptions, configFiles = [], routes, services, plugins, postRegisterHook, swaggerOptions, loggerOptions, dockerized = false, intializers = [], }) => await (0, server_1.default)({
    dbConnect,
    schema,
    serverOptions,
    config: (0, config_1.default)(config, configFiles, configOptions),
    routes,
    services,
    plugins,
    postRegisterHook,
    swaggerOptions,
    loggerOptions,
    dockerized,
    intializers,
});
exports.server = server;
const config = config_1.conf;
exports.config = config;
//# sourceMappingURL=index.js.map