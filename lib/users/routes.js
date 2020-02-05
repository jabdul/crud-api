"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = exports.ROUTE_NAME = void 0;
const ROUTE_NAME = 'users';
exports.ROUTE_NAME = ROUTE_NAME;
const options = {
  log: {
    collect: true
  },
  auth: false
};

var _default = ({
  services,
  config,
  validate,
  uuid,
  json
}) => ({
  method: 'POST',
  path: `/${ROUTE_NAME}`,
  options: { ...options,
    validate: {
      failAction: async (request, h, err) => err,
      // eslint-disable-line
      headers: validate.object({
        authorization: validate.string().optional() // 'host': validate.string().optional(),
        // 'accept-encoding': validate.string().optional(),
        // 'connection': validate.string().optional(),
        // 'accept': validate.string().optional(),
        // 'user-agent': validate.string().optional(),
        // 'referer': validate.string().optional(),
        // 'accept-language': validate.string().optional()

      }).unknown(),
      payload: {
        firstname: validate.string().min(2).max(64).required(),
        lastname: validate.string().min(2).max(64),
        meta: validate.object({
          active: validate.boolean()
        })
      }
    },
    tags: ['api']
  },
  handler: async (request, h) => {
    request.log([`/${ROUTE_NAME}`], 'Create new user');
    return h.response((await services[ROUTE_NAME].create({
      payload: request.payload,
      config,
      uuid,
      json,
      log: request.log
    }))).code(201).type('application/hal+json');
  }
});

exports.default = _default;