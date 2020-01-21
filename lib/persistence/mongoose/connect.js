'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _extends2 = require('babel-runtime/helpers/extends');

var _extends3 = _interopRequireDefault(_extends2);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.default = async function (Mongoose, config) {
  try {
    var dbConnectOptions = config.has('dbConnectOptions') ? (0, _extends3.default)({}, config.get('dbConnectOptions'), { useNewUrlParser: true }) : { useNewUrlParser: true };
    return await Mongoose.connect('' + config.get('mongo.host'), (0, _extends3.default)({ dbName: config.get('mongo.database') }, dbConnectOptions));
  } catch (error) {
    throw error;
  }
};