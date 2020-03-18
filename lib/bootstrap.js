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
Object.defineProperty(exports, "__esModule", { value: true });
const path = __importStar(require("path"));
const hapi_auth_jwt2_1 = __importDefault(require("hapi-auth-jwt2"));
const _1 = require("./"); // eslint-disable-line no-unused-vars
// import { schema as mysqlSchema } from './persistence/mysql';
const config_1 = require("./config");
const mongoose_1 = require("./persistence/mongoose");
const routes_1 = __importDefault(require("./routes"));
const services_1 = __importDefault(require("./services"));
require("./env");
const validate = async ( /* payload, request*/) => {
    // Apply validation check here...
    return { isValid: true };
};
const application = () => _1.server({
    dbConnect: _1.mongooseConnect,
    schema: mongoose_1.schema,
    config: config_1.conf,
    configFiles: [
        path.resolve(__dirname, `../config/${String(process.env.NODE_ENV)}.json`)
    ],
    configOptions: {
        dbConnectOptions: { useNewUrlParser: true, useFindAndModify: false }
    },
    routes: routes_1.default,
    services: services_1.default,
    plugins: [{ plugin: hapi_auth_jwt2_1.default, options: {} }],
    postRegisterHook: async (app) => {
        app.auth.strategy("jwt", "jwt", {
            key: "NeverShareYourSecret",
            validate: await validate,
            verifyOptions: { algorithms: ["HS256"] }
        });
        app.auth.default("jwt"); // JWT auth is required for all routes
    },
    swaggerOptions: {
        auth: false,
        tags: {
            users: "Operation for handling user records"
        },
        info: {
            title: "Microservice CRUD API Server",
            description: "Powering Craft Turf's microservice projects",
            version: "0.0.1"
        }
    },
    swaggerUiOptions: {
        title: "CRUD API",
        path: "/docs",
        authorization: false,
        auth: false,
        swaggerOptions: {
            validatorUrl: null
        }
    },
    loggerOptions: {
        ops: {
            interval: 1000
        },
        reporters: {
            console: [
                {
                    module: "good-squeeze",
                    name: "Squeeze",
                    args: [
                        {
                            log: "*",
                            response: "*",
                            error: "*",
                            request: { include: ["hapi"], exclude: "sensitive" }
                        }
                    ]
                },
                {
                    module: "good-console"
                },
                "stdout"
            ]
        }
    },
    serverOptions: {}
});
!module.parent &&
    (async () => {
        const app = await application();
        await app.start();
        console.log(`App runninng on ${app.info.uri}`); // eslint-disable-line
    })();
exports.default = application;
