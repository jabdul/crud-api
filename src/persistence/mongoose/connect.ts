import { Config } from 'convict';
import { Mongoose } from 'mongoose';

export default async (mongoose: Mongoose, config: Config<object>): Promise<Mongoose> => {
  const dbConnectOptions = config.has('dbConnectOptions')
    ? {
        ...config.get('dbConnectOptions'),
        ...{ useNewUrlParser: true },
      }
    : { useNewUrlParser: true };
  const opts = {
    ...{
      dbName: `${config.has('mongo.database') ? config.get('mongo.database') : config.get('service.name')}${
        process.env.NODE_ENV === 'test' ? '_' + process.env.NODE_ENV : ''
      }`,
    },
    ...dbConnectOptions,
    bufferMaxEntries: 0,
    bufferCommands: false,
    connectTimeoutMS: 10000,
    useUnifiedTopology: true,
  };

  return await mongoose.connect(`${config.get('mongo.host')}`, opts);
};
