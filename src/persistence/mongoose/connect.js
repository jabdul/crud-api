export default async (Mongoose, config) => {
  try {
    return await Mongoose.connect(`${config.get('mongo.host')}`, {
      ...{ dbName: config.get('mongo.database') },
      ...config.get('dbConnectOptions')
    });
  } catch(error) {
    throw error;
  }
}
