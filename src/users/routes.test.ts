import create, { ROUTE_NAME } from "./routes";

describe(`Routes: ${ROUTE_NAME}`, () => {
  const services = {
    users: {
      create: jest
        .fn()
        .mockReturnValue("Thanks for opening account Mr Abiodun Abdul!!!")
    }
  };
  const validate = {
    string: jest.fn(),
    min: jest.fn(),
    max: jest.fn(),
    optional: jest.fn(),
    boolean: jest.fn(),
    required: jest.fn(),
    object: jest.fn().mockImplementation(() => ({
      unknown: jest.fn().mockReturnValue({})
    }))
  };
  validate.string.mockImplementation(() => validate);
  validate.min.mockImplementation(() => validate);
  validate.max.mockImplementation(() => validate);
  validate.required.mockImplementation(() => validate);
  validate.optional.mockImplementation(() => validate);
  validate.boolean.mockImplementation(() => validate);

  describe(`POST /${ROUTE_NAME}`, () => {
    const router = create({ services, validate });
    const responseData = "Thanks for opening account Mr Abiodun Abdul!!!";
    const statusCode = 201;
    const contentType = "application/hal+json";
    let mockRequest = { log: null };
    let mockResponse = null;
    let mockData = null;
    let mockStatusCode = null;
    let mockContentType = null;

    beforeEach(() => {
      mockData = jest.fn();
      mockStatusCode = jest.fn();
      mockContentType = jest.fn();

      mockResponse = {
        response: mockData,
        code: mockStatusCode,
        type: mockContentType
      };
      mockData.mockImplementation(() => mockResponse);
      mockStatusCode.mockImplementation(() => mockResponse);
      mockContentType.mockImplementation(() => mockResponse);
      mockRequest = { log: jest.fn() };
    });

    it(`sets HTTP method POST on /${ROUTE_NAME} path`, () => {
      expect(router.method).toBe("POST");
      expect(router.path).toBe(`/${ROUTE_NAME}`);
    });

    it("sets validation on request payload", () => {
      const payload = router.options.validate.payload;
      expect(payload.firstname).toBeDefined();
      expect(payload.lastname).toBeDefined();
    });

    it(`sets response HTTP status code to ${statusCode} on success`, async () => {
      await router.handler(mockRequest, mockResponse);
      expect(mockStatusCode.mock.calls[0][0]).toBe(statusCode);
    });

    it(`sets response HTTP header Content-Type to ${contentType} on success`, async () => {
      await router.handler(mockRequest, mockResponse);
      expect(mockContentType.mock.calls[0][0]).toBe(contentType);
    });

    it("returns response data on success", async () => {
      await router.handler(mockRequest, mockResponse);
      expect(mockData.mock.calls[0][0]).toBe(responseData);
    });

    it("logs tagged request", async () => {
      await router.handler(mockRequest, mockResponse);
      expect(mockRequest.log.mock.calls[0][0]).toEqual([`/${ROUTE_NAME}`]);
    });
  });
});
