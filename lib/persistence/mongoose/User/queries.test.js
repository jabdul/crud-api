"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

var _factoryGirl = require("factory-girl");

var _user = _interopRequireDefault(require("../../../../test/factories/user"));

var _queries = _interopRequireDefault(require("./queries"));

var _index = require("../../../index");

// eslint-disable-line no-unused-vars
const db = (0, _index.mongooseConnect)(_index.dbConfig);
let userQueries = (0, _queries.default)(db); // eslint-disable-line no-unused-vars

describe('Users queries', () => {
  describe('create', () => {
    it('can create a user', async () => {
      const payload = await _factoryGirl.factory.attrs('User');
      const user = await userQueries.create({
        payload
      });
      expect(user).toBeDefined();
      expect(user).toHaveProperty('firstname');
      expect(user).toHaveProperty('lastname');
      expect(user).toHaveProperty('uuid');
      expect(user['firstname']).toEqual(payload['firstname']);
      expect(user['lastname']).toEqual(payload['lastname']);
    });
    it('cannot create a user', async () => {
      const payload = await _factoryGirl.factory.attrs('User', {
        firstname: undefined
      });

      try {
        await expect((await (async () => userQueries.create({
          payload
        }))())).resolves.toThrow();
      } catch ({
        errors,
        name,
        message
      }) {
        expect(name).toBe('ValidationError');
        expect(message).toMatch(/`firstname` is required/);
        expect(errors).toHaveProperty('firstname');
        expect(errors['firstname']['path']).toBe('firstname');
        expect(errors['firstname']['kind']).toBe('required');
      }
    });
  });
});