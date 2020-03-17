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
    const opts = { ...{
        dbName: `${config.has('mongo.database') ? config.get('mongo.database') : config.get('service.name')}${process.env.NODE_ENV !== 'production' ? '_' + process.env.NODE_ENV : ''}`
      },
      ...dbConnectOptions,
      bufferMaxEntries: 0,
      bufferCommands: false,
      connectTimeoutMS: 10000,
      useUnifiedTopology: true
    };
    return await Mongoose.connect(`${config.get('mongo.host')}`, opts);
  } catch (error) {
    throw error;
  }
};

exports.default = _default;