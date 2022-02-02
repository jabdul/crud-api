'use strict';
var __importStar =
  (this && this.__importStar) ||
  function(mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (Object.hasOwnProperty.call(mod, k)) result[k] = mod[k];
    result['default'] = mod;
    return result;
  };
var __importDefault =
  (this && this.__importDefault) ||
  function(mod) {
    return mod && mod.__esModule ? mod : { default: mod };
  };
Object.defineProperty(exports, '__esModule', { value: true });
const config_1 = __importStar(require('./config'));
exports.dbConfig = config_1.dbConfig;
const server_1 = __importDefault(require('./server'));
const mysql_1 = __importDefault(require('./persistence/mysql'));
exports.mysqlConnect = mysql_1.default;
const mongoose_1 = __importDefault(require('./persistence/mongoose'));
exports.mongooseConnect = mongoose_1.default;
exports.server = async ({
  dbConnect,
  schema,
  serverOptions,
  config,
  configOptions,
  configFiles = [],
  routes,
  services,
  plugins,
  postRegisterHook,
  swaggerOptions,
  loggerOptions,
}) =>
  await server_1.default({
    dbConnect,
    schema,
    serverOptions,
    config: config_1.default(config, configFiles, configOptions),
    routes,
    services,
    plugins,
    postRegisterHook,
    swaggerOptions,
    // swaggerUiOptions,
    loggerOptions,
  });
const config = config_1.conf;
exports.config = config;
//# sourceMappingURL=index.js.map
