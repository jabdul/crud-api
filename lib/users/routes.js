'use strict';
Object.defineProperty(exports, '__esModule', { value: true });
exports.ROUTE_NAME = 'users';
const options = {
  log: { collect: true },
  auth: false,
};
exports.default = ({ services, config, validate }) => ({
  method: 'POST',
  path: `/${exports.ROUTE_NAME}`,
  options: Object.assign(Object.assign({}, options), {
    validate: {
      failAction: async (request, h, err) => err,
      headers: validate
        .object({
          authorization: validate.string().optional(),
        })
        .unknown(),
      payload: {
        firstname: validate
          .string()
          .min(2)
          .max(64)
          .required(),
        lastname: validate
          .string()
          .min(2)
          .max(64),
        meta: validate.object({
          active: validate.boolean(),
        }),
      },
    },
    tags: ['api'],
  }),
  handler: async (request, h) => {
    request.log([`/${exports.ROUTE_NAME}`], 'Create new user');
    request.logger.info(request.path || `/${exports.ROUTE_NAME}`);
    return h
      .response(
        await services[exports.ROUTE_NAME].create({
          payload: request.payload,
          config,
          log: request.log,
        })
      )
      .code(201)
      .type('application/json');
  },
});
//# sourceMappingURL=routes.js.map
