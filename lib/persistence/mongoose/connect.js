'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

exports.default = async function (Mongoose, config) {
  try {
    return await Mongoose.connect('' + config.get('mongo.host'), {
      dbName: config.get('mongo.database')
    });
  } catch (error) {
    throw error;
  }
};