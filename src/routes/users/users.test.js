import create from './users';

describe('Routes: users', () => {
  const services = {
    users: {
      create: jest.fn().mockReturnValue('Thanks for opening account Mr Abiodun Abdul!!!'),
    }
  };

  describe('POST /users/', () => {
    const router = create({ services });
    const responseData = 'Thanks for opening account Mr Abiodun Abdul!!!';
    const statusCode = 201;
    let mockRequest = null;
    let mockResponse = null;
    let mockData = null;
    let mockStatusCode = null;

    beforeEach(() => {
      mockData = jest.fn();
      mockStatusCode = jest.fn();

      mockResponse = {
        response: mockData,
        code: mockStatusCode
      };
      mockData.mockImplementation(() => mockResponse);
      mockStatusCode.mockImplementation(() => mockResponse);
      mockRequest = { log: jest.fn() };
    });

    it('sets HTTP method POST on \'/users/\' path', () => {
      expect(router.method).toBe('POST');
      expect(router.path).toBe('/users/');
    });

    it(`sets response HTTP status code to ${statusCode} on success`, async () => {
      await router.handler(mockRequest, mockResponse);
      expect(mockStatusCode.mock.calls[0][0]).toBe(statusCode);
    });

    it('returns response data on success', async () => {
      await router.handler(mockRequest, mockResponse);
      expect(mockData.mock.calls[0][0]).toBe(responseData);
    });

    it('logs tagged request', async () => {
      await router.handler(mockRequest, mockResponse);
      expect(mockRequest.log.mock.calls[0][0]).toEqual(['users']);
    });
  });
});
