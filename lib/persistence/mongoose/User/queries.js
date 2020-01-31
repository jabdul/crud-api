'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _model = require('./model');

var _model2 = _interopRequireDefault(_model);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var _create = async function _create(_ref) {
  var payload = _ref.payload;

  var user = new _model2.default();

  user.uuid = payload.uuid;
  user.firstname = payload.firstname;
  user.lastname = payload.lastname;

  return await user.save();
};

var _findAll = async function _findAll(_ref2) {
  var payload = _ref2.payload;
  return await _model2.default.paginate({}, { page: payload.pageid, limit: payload.limit });
};

var _removeById = async function _removeById(_ref3) {
  var payload = _ref3.payload;
  return await _model2.default.updateOne({ _id: payload.uuid }, {
    active: false
  });
};

exports.default = function (client) {
  return {
    create: async function create(_ref4) {
      var payload = _ref4.payload,
          config = _ref4.config;
      return await _create({ client: client, payload: payload, config: config });
    },
    findAll: async function findAll(_ref5) {
      var payload = _ref5.payload,
          config = _ref5.config;
      return await _findAll({ payload: payload, config: config });
    },
    removeById: async function removeById(_ref6) {
      var payload = _ref6.payload;
      return await _removeById({ payload: payload });
    }
  };
};