'use strict';
var __importDefault =
  (this && this.__importDefault) ||
  function(mod) {
    return mod && mod.__esModule ? mod : { default: mod };
  };
Object.defineProperty(exports, '__esModule', { value: true });
exports.MetaSchema = void 0;
const mongoose_1 = __importDefault(require('mongoose'));
const uuid_1 = __importDefault(require('uuid'));
exports.MetaSchema = new mongoose_1.default.Schema(
  {
    active: { type: Boolean, default: true },
    updated: { type: Date },
    created: { type: Date },
  },
  { _id: false }
);
const UserSchema = new mongoose_1.default.Schema(
  {
    uuid: { type: String, default: uuid_1.default.v4 },
    firstname: { type: String, required: true },
    lastname: { type: String, required: true },
    meta: { type: exports.MetaSchema },
  },
  { bufferCommands: false }
);
UserSchema.index({ firstname: 1, lastname: 1 });
const User = mongoose_1.default.model('Users', UserSchema);
exports.default = User;
//# sourceMappingURL=model.js.map
