import { Config } from 'convict';
import { ConnectOptions, Mongoose } from 'mongoose';

export default (config: Config<object>): Function => (mongoose: Mongoose): Promise<Mongoose> => {
  const dbConnectOptions = config.has('dbConnectOptions')
    ? {
        ...config.get('dbConnectOptions'),
        ...{ useNewUrlParser: true },
      }
    : { useNewUrlParser: true };
  const opts: ConnectOptions = {
    ...{
      dbName: `${config.has('mongo.database') ? config.get('mongo.database') : config.get('service.name')}${
        process.env.NODE_ENV === 'test' ? '_' + process.env.NODE_ENV : ''
      }`,
    },
    ...dbConnectOptions,
    bufferCommands: false,
    connectTimeoutMS: 10000,
    useUnifiedTopology: true,
    autoCreate: false,
    autoIndex: false,
  };

  return mongoose.connect(config.get('mongo.host'), opts);
};
