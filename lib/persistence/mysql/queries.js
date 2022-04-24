'use strict';
var __importDefault =
  (this && this.__importDefault) ||
  function(mod) {
    return mod && mod.__esModule ? mod : { default: mod };
  };
Object.defineProperty(exports, '__esModule', { value: true });
const queries_1 = __importDefault(require('./User/queries'));
exports.default = client => ({
  users: (0, queries_1.default)(client),
});
//# sourceMappingURL=queries.js.map
