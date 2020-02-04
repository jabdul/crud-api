"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

var _services = _interopRequireDefault(require("../services"));

describe('Services: users', () => {
  describe('.create', () => {
    const uid = 'dfa7fd57-5d6b-4563-b60e-6c9f78f19579';
    const uuid = jest.fn().mockReturnValue(uid);
    const hal = {
      "_links": {
        "self": {
          "href": `/users/${uid}`
        }
      }
    }; // eslint-disable-line

    const json = jest.fn(() => ({
      addLink: jest.fn().mockReturnValue(hal)
    }));
    it('returns hal-json formatted record for newly created user', async () => {
      const db = {
        users: {
          create: jest.fn().mockReturnValue(true)
        }
      };
      const users = (0, _services.default)(db).users;
      const actual = await users.create({
        uuid,
        json
      });
      expect(actual).toEqual(hal);
    });
    it.skip('throws an error when new record creation fails', async () => {
      const db = {
        users: {
          create: jest.fn().mockReturnValue(false)
        }
      };
      const log = jest.fn();
      const users = (0, _services.default)(db).users;
      const actual = await users.create({
        uuid,
        json,
        log
      });
      expect(actual).toEqual(Error('Could not create record'));
    });
  });
});