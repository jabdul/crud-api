'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

exports.default = function (mongoose, config) {
  return mongoose.connect(config.get('mongo.host'), {});
};