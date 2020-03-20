import create, { ROUTE_NAME } from "./routes";

describe(`Routes: ${ROUTE_NAME}`, () => {
  describe(`GET /${ROUTE_NAME}`, () => {
    const router = create() as any; // eslint-disable-line @typescript-eslint/no-explicit-any
    const responseData = JSON.stringify("OK");
    const statusCode = 200;
    const contentType = "application/json";
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
      expect(router.method).toBe("GET");
      expect(router.path).toBe(`/${ROUTE_NAME}`);
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
