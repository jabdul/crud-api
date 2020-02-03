"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = exports.ROUTE_NAME = void 0;
const ROUTE_NAME = 'monitoring/healthz';
exports.ROUTE_NAME = ROUTE_NAME;
const options = {
  log: {
    collect: true
  },
  auth: false
};

var _default = () => ({
  method: 'GET',
  path: `/${ROUTE_NAME}`,
  options: { ...options,
    tags: ['api']
  },
  handler: async (request, h) => {
    request.log([`/${ROUTE_NAME}`], 'Checking application health.');
    return h.response(JSON.stringify('OK')).code(200).type('application/json');
  }
});

exports.default = _default;