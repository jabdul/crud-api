export default async (Mongoose, config) => {
  try {
    const dbConnectOptions = config.has('dbConnectOptions') ? {
      ...config.get('dbConnectOptions'), ...{ useNewUrlParser: true }
    } : { useNewUrlParser: true }
    return await Mongoose.connect(`${config.get('mongo.host')}`, {
      ...{
        dbName: `${config.has('mongo.database') ?
          config.get('mongo.database') :
          config.get('service.name')}${process.env.NODE_ENV !== 'production' ?
            ('_' + process.env.NODE_ENV) : ''}`
      },
      ...dbConnectOptions
    });
  } catch (error) {
    throw error;
  }
}
