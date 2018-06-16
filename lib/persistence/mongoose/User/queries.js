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

exports.default = function (client) {
  return {
    create: async function create(_ref2) {
      var payload = _ref2.payload,
          config = _ref2.config;
      return await _create({ client: client, payload: payload, config: config });
    }
  };
};