'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.ROUTE_NAME = undefined;

var _extends2 = require('babel-runtime/helpers/extends');

var _extends3 = _interopRequireDefault(_extends2);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var ROUTE_NAME = exports.ROUTE_NAME = 'users';

var options = {
  log: { collect: true },
  auth: 'jwt'
};

exports.default = function (_ref) {
  var services = _ref.services,
      config = _ref.config,
      validate = _ref.validate,
      uuid = _ref.uuid,
      json = _ref.json;
  return {
    method: 'POST',
    path: '/' + ROUTE_NAME,
    options: (0, _extends3.default)({}, options, { validate: {
        headers: validate.object({
          authorization: validate.string().required()
          // 'host': validate.string().optional(),
          // 'accept-encoding': validate.string().optional(),
          // 'connection': validate.string().optional(),
          // 'accept': validate.string().optional(),
          // 'user-agent': validate.string().optional(),
          // 'referer': validate.string().optional(),
          // 'accept-language': validate.string().optional()
        }).unknown(),
        payload: {
          firstname: validate.string().min(2).max(64).required(),
          lastname: validate.string().min(2).max(64)
        }
      },
      tags: ['api']
    }),
    handler: async function handler(request, h) {
      request.log(['/' + ROUTE_NAME], 'Create new user');
      return h.response((await services[ROUTE_NAME].create({ payload: request.payload, config: config, uuid: uuid, json: json, log: request.log }))).code(201).type('application/hal+json');
    }
  };
};