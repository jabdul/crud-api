'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _joi = require('joi');

var _joi2 = _interopRequireDefault(_joi);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var options = {
  log: { collect: true },
  validate: {
    payload: {
      firstname: _joi2.default.string().min(2).max(64).required(),
      lastname: _joi2.default.string().min(2).max(64)
    }
  }
};

exports.default = function (_ref) {
  var users = _ref.services.users,
      config = _ref.config;
  return {
    method: 'POST',
    path: '/users/',
    options: options,
    handler: async function handler(request, h) {
      request.log(['users'], 'Create new user');
      return h.response((await users.create({ payload: request.payload, config: config }))).code(201);
    }
  };
};