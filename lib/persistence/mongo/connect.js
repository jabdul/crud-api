'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _util = require('util');

exports.default = function (MongoClient, config) {
  return (0, _util.promisify)(MongoClient.connect)(config.get('mongo.host'));
};