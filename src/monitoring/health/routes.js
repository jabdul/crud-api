export const ROUTE_NAME = 'monitoring/health';

const options = {
  log: { collect: true },
  auth: false,
};

export default () => ({
  method: 'GET',
  path: `/${ROUTE_NAME}`,
  options: {
    ...options,
    tags: ['api'],
  },
  handler: async (request, h) => {
    request.log([`/${ROUTE_NAME}`], 'Checking application health.');
    return h.response(JSON.stringify('OK'))
      .code(200)
      .type('application/json');
  }
});
