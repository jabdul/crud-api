"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _default = async (Mongoose, config) => {
  try {
    const dbConnectOptions = config.has('dbConnectOptions') ? { ...config.get('dbConnectOptions'),
      ...{
        useNewUrlParser: true
      }
    } : {
      useNewUrlParser: true
    };
    return await Mongoose.connect(`${config.get('mongo.host')}`, { ...{
        dbName: config.get('mongo.database')
      },
      ...dbConnectOptions
    });
  } catch (error) {
    throw error;
  }
};

exports.default = _default;