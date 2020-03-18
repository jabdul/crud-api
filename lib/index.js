"use strict";
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (Object.hasOwnProperty.call(mod, k)) result[k] = mod[k];
    result["default"] = mod;
    return result;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
const config_1 = __importStar(require("./config"));
const server_1 = __importDefault(require("./server"));
const mysql_1 = __importDefault(require("./persistence/mysql"));
const mongoose_1 = __importDefault(require("./persistence/mongoose"));
console.log("@@@@@@@@@", module.exports);
module.exports = {
    server: async ({ dbConnect, schema, serverOptions, config, configOptions, configFiles = [], routes, services, plugins, postRegisterHook, swaggerOptions, swaggerUiOptions, loggerOptions }) => await server_1.default({
        dbConnect,
        schema,
        serverOptions,
        config: config_1.default(config, configFiles, configOptions),
        routes,
        services,
        plugins,
        postRegisterHook,
        swaggerOptions,
        swaggerUiOptions,
        loggerOptions
    }),
    mysqlConnect: mysql_1.default,
    mongooseConnect: mongoose_1.default,
    config: config_1.conf,
    dbConfig: config_1.dbConfig
};
