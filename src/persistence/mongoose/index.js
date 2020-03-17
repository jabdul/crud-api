import mongoose from 'mongoose';

import connect from './connect';
import queries from './queries';

export const schema = client => queries(client);

export const close = mongo => mongo.disconnect();

export default async config => {
  const client = await connect(new mongoose.Mongoose(), config);
  mongoose.set('useCreateIndex', true);
  mongoose.set('bufferCommands', false);
  
  return client;
}
