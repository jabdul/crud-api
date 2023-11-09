import { ServerRoute, RouteOptions } from 'hapi';
export const ROUTE_NAME = 'monitoring/healthz';

const options = {
  log: { collect: true },
  auth: false,
};

export default (): ServerRoute => ({
  method: 'GET',
  path: `/${ROUTE_NAME}`,
  options: {
    ...options,
    tags: ['api'],
  } as RouteOptions,
  handler: async (request, h) => {
    request.log([`/${ROUTE_NAME}`], 'Checking application health.');
    return h
      .response(JSON.stringify('OK'))
      .code(200)
      .type('application/json');
  },
});
