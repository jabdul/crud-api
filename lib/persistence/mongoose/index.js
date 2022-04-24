'use strict';
var __importDefault =
  (this && this.__importDefault) ||
  function(mod) {
    return mod && mod.__esModule ? mod : { default: mod };
  };
Object.defineProperty(exports, '__esModule', { value: true });
exports.close = exports.schema = void 0;
const mongoose_1 = __importDefault(require('mongoose'));
const connect_1 = __importDefault(require('./connect'));
const createCollection_1 = __importDefault(require('./createCollection'));
const createIndex_1 = __importDefault(require('./createIndex'));
const queries_1 = __importDefault(require('./queries'));
const schema = client => (0, queries_1.default)(client);
exports.schema = schema;
const close = mongo => mongo.disconnect();
exports.close = close;
mongoose_1.default.set('bufferCommands', false);
const pipePromiseFns = (...fns) => x => fns.reduce((y, f) => y.then(f), Promise.resolve(x));
exports.default = config =>
  pipePromiseFns(
    (0, connect_1.default)(config),
    createCollection_1.default,
    (0, createIndex_1.default)(config)
  )(mongoose_1.default);
//# sourceMappingURL=index.js.map
