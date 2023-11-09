import { Config } from 'convict';
import { Mongoose } from 'mongoose';

export default (config: Config<object>): Function => async (dbConnection: Mongoose): Promise<Mongoose> => {
  const dbConnectOptions = config.has('dbModifiers') ? config.get('dbModifiers') : { createIndex: true };

  try {
    if (dbConnectOptions.createIndex)
      await Promise.allSettled(Object.values(dbConnection.models).map(async model => model.ensureIndexes()));
  } catch (error) {
    console.error(error);
  }

  return dbConnection;
};
