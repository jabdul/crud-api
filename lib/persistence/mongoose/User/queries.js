"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _model = _interopRequireDefault(require("./model"));

const create = async ({
  payload
}) => {
  const user = new _model.default();
  user.uuid = payload.uuid;
  user.firstname = payload.firstname;
  user.lastname = payload.lastname;
  return await user.save();
};

var _default = client => ({
  create: async ({
    payload,
    config
  }) => await create({
    client,
    payload,
    config
  })
});

exports.default = _default;