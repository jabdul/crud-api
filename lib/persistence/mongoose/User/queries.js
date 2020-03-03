"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _ramda = require("ramda");

var _model = _interopRequireDefault(require("./model"));

const create = async ({
  payload
}) => {
  const user = new _model.default();
  const {
    uuid,
    firstname,
    lastname,
    meta
  } = payload;
  user.uuid = uuid;
  user.firstname = firstname;
  user.lastname = lastname;
  user.meta = meta;
  return await user.save();
};

const findById = async ({
  payload
}) => _model.default.findOne({
  uuid: payload.uuid
});

const updateById = async ({
  payload
}) => _model.default.updateOne({
  uuid: payload.uuid
}, {
  $set: { ...(0, _ramda.pickBy)(val => val !== undefined, { ...(0, _ramda.omit)('uuid', payload)
    }),
    'meta.updated': Date.now()
  }
});

var _default = client => ({
  create: async ({
    payload,
    config
  }) => await create({
    client,
    payload,
    config
  }),
  findById: async ({
    payload,
    config
  }) => await findById({
    client,
    payload,
    config
  }),
  updateById: async ({
    payload,
    config
  }) => await updateById({
    client,
    payload,
    config
  })
});

exports.default = _default;