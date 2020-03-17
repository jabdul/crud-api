"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

var _factoryGirl = require("factory-girl");

var _user = _interopRequireDefault(require("../../../../test/factories/user"));

var _queries = _interopRequireDefault(require("./queries"));

var _index = require("../../../index");

// eslint-disable-line no-unused-vars
const db = (0, _index.mongooseConnect)(_index.dbConfig);
let userQueries = (0, _queries.default)(db); // eslint-disable-line no-unused-vars

const verifyUser = user => {
  expect(user).toHaveProperty('firstname');
  expect(user).toHaveProperty('lastname');
  expect(user).toHaveProperty('uuid');
};

const verifyResponse = ({
  user,
  payload
}) => {
  expect(user['firstname']).toEqual(payload['firstname']);
  expect(user['lastname']).toEqual(payload['lastname']);
  expect(user['uuid']).toEqual(payload['uuid']);
  expect(user['meta.active']).toEqual(payload['meta.active']);
};

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
  describe('findById', () => {
    it('can find a single user', async () => {
      const user = await _factoryGirl.factory.create('User');
      const findUser = await userQueries.findById({
        payload: {
          uuid: user.uuid
        }
      });
      expect(findUser).toBeDefined();
      verifyUser(findUser);
      verifyResponse({
        user: findUser,
        payload: user
      });
    });
    it('should not find a user with an invalid uuid', async () => {
      const uuid = '02117187-a5d5-4681-b087-8b4b337d5b8d';
      const res = await userQueries.findById({
        payload: {
          uuid: uuid
        }
      });
      expect(res).toBe(null);
    });
  });
  describe('updateById', () => {
    it('update a single user', async () => {
      const user = await _factoryGirl.factory.create('User');
      const updateUser = await userQueries.updateById({
        payload: {
          uuid: user.uuid,
          firstname: 'Micah',
          lastname: 'Joel'
        }
      });
      expect(updateUser).toBeDefined();
      expect(updateUser).toHaveProperty('nModified');
      expect(updateUser).toHaveProperty('n');
      expect(updateUser).toHaveProperty('ok');
      expect(updateUser['nModified']).toEqual(1);
      expect(updateUser['n']).toEqual(1);
      expect(updateUser['ok']).toEqual(1);
      const findOneUser = await userQueries.findById({
        payload: {
          uuid: user.uuid
        }
      });
      expect(findOneUser).toBeDefined();
      verifyUser(findOneUser);
      expect(findOneUser.meta).toHaveProperty('updated');
    });
    it('should not update a user with an invalid uuid', async () => {
      const uuid = '84b5eaa1-bcb0-4107-a082-75156bb6c56a';
      const res = await userQueries.updateById({
        payload: {
          uuid,
          firstname: 'Wendy',
          lastname: 'Mcmanaman'
        }
      });
      expect(res.meta).toBeUndefined();
      const findOneUser = await userQueries.findById({
        payload: {
          uuid: uuid
        }
      });
      expect(findOneUser).toBeNull();
    });
  });
});