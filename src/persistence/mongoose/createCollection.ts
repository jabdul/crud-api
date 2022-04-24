import { Mongoose } from 'mongoose';

export default async (dbConnection: Mongoose): Promise<Mongoose> => {
  try {
    await Promise.all(Object.values(dbConnection.models).map(async model => model.createCollection()));
  } catch (error) {
    console.error(error);
  }

  return dbConnection;
};
