'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
var options = {
  log: { collect: true }
};

exports.default = function (_ref) {
  var users = _ref.services.users;
  return {
    method: 'POST',
    path: '/users/',
    options: options,
    handler: async function handler(request, h) {
      request.log(['users'], 'Create new user');
      return h.response((await users.create(request.payload))).code(201);
    }
  };
};