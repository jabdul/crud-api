'use strict';
var __importDefault =
  (this && this.__importDefault) ||
  function(mod) {
    return mod && mod.__esModule ? mod : { default: mod };
  };
Object.defineProperty(exports, '__esModule', { value: true });
const services_1 = __importDefault(require('./users/services'));
exports.default = db => ({
  users: services_1.default(db),
});
//# sourceMappingURL=services.js.map
