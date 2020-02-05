"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

var _bootstrap = _interopRequireDefault(require("../bootstrap"));

var _factoryGirl = require("factory-girl");

var _user = _interopRequireDefault(require("../../test/factories/user"));

var _routes = require("./routes");

// import mongoose from 'mongoose';
// eslint-disable-line no-unused-vars
let app = null;
const url = `/${_routes.ROUTE_NAME}`;

const parsedResponse = ({
  payload
}) => JSON.parse(payload);

describe('Users', () => {
  beforeAll(async () => {
    app = await (0, _bootstrap.default)();
    await app.start();
  });
  afterAll(async () => {
    await app.stop({
      timeout: 100
    });
    await app.db.close();
  });
  describe('Create', () => {
    it('Create User', async () => {
      const payload = await _factoryGirl.factory.attrs('User');
      const response = await app.inject({
        method: 'POST',
        url,
        payload
      });
      expect(response.statusCode).toBe(201);
      expect(response.statusMessage).toBe('Created');
      expect(response.headers['content-type']).toEqual('application/hal+json');
      const user = parsedResponse(response);
      expect(user).toHaveProperty('firstname');
      expect(user).toHaveProperty('lastname');
      expect(user).toHaveProperty('uuid');
      expect(user['firstname']).toEqual(payload['firstname']);
      expect(user['lastname']).toEqual(payload['lastname']);
      expect(user['uuid']).toMatch(/\b(?=([0-9A-F]{8})\b)\1-(?=([0-9A-F]{4}))\2-(?=(4[0-9A-F]{3}))\3-(?=([89AB][0-9A-F]{3}))\4-(?=([0-9A-F]{12}))\5\b/i // eslint-disable-line
      );
    });
    it('Cannot create User', async () => {
      const payload = await _factoryGirl.factory.attrs('User', {
        firstname: null
      });
      const response = await app.inject({
        method: 'POST',
        url,
        payload
      });
      expect(response.statusCode).toBe(400);
      expect(response.statusMessage).toBe('Bad Request');
      expect(response.headers['content-type']).toEqual('application/json; charset=utf-8');
    });
  });
});