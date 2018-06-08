'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
var options = {
  log: { collect: true },
  options: {
    validate: {
      payload: {
        firstname: Joi.string().min(2).max(64).required(),
        lastname: Joi.string().min(2).max(64)
      }
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