import { Connection } from "mongoose";

export default async (Mongoose, config): Promise<Connection> => {
  const dbConnectOptions = config.has("dbConnectOptions")
    ? {
        ...config.get("dbConnectOptions"),
        ...{ useNewUrlParser: true }
      }
    : { useNewUrlParser: true };
  const opts = {
    ...{
      dbName: `${
        config.has("mongo.database")
          ? config.get("mongo.database")
          : config.get("service.name")
      }${
        process.env.NODE_ENV !== "production" ? "_" + process.env.NODE_ENV : ""
      }`
    },
    ...dbConnectOptions,
    bufferMaxEntries: 0,
    bufferCommands: false,
    connectTimeoutMS: 10000,
    useUnifiedTopology: true
  };

  return await Mongoose.connect(`${config.get("mongo.host")}`, opts);
};
