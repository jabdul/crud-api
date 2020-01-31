'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _mongoose = require('mongoose');

var _mongoose2 = _interopRequireDefault(_mongoose);

var _mongoosePaginate = require('mongoose-paginate');

var _mongoosePaginate2 = _interopRequireDefault(_mongoosePaginate);

var _uuid = require('uuid');

var _uuid2 = _interopRequireDefault(_uuid);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

_mongoosePaginate2.default.paginate.options = {
  limit: 100
};

var Schema = _mongoose2.default.Schema;

var UserSchema = new Schema({
  uuid: { type: String, default: _uuid2.default.v4 },
  firstname: { type: String, required: true },
  lastname: { type: String, required: true },
  created: { type: Date, default: Date.now }
});

UserSchema.plugin(_mongoosePaginate2.default);

var User = _mongoose2.default.model('User', UserSchema);

exports.default = User;