'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.ROUTE_NAME = undefined;

var _stringify = require('babel-runtime/core-js/json/stringify');

var _stringify2 = _interopRequireDefault(_stringify);

var _extends2 = require('babel-runtime/helpers/extends');

var _extends3 = _interopRequireDefault(_extends2);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var ROUTE_NAME = exports.ROUTE_NAME = 'monitoring/healthz';

var options = {
  log: { collect: true },
  auth: false
};

exports.default = function () {
  return {
    method: 'GET',
    path: '/' + ROUTE_NAME,
    options: (0, _extends3.default)({}, options, {
      tags: ['api']
    }),
    handler: async function handler(request, h) {
      request.log(['/' + ROUTE_NAME], 'Checking application health.');
      return h.response((0, _stringify2.default)('OK')).code(200).type('application/json');
    }
  };
};