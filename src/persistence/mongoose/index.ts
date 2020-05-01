import mongoose, { Mongoose } from 'mongoose';

import connect from './connect';
import queries from './queries';
import { DbClient, Dict } from '../../';
import { Config } from 'convict';

export const schema = (client: DbClient): Dict => queries(client);

export const close = (mongo: Mongoose): Promise<void> => mongo.disconnect();

mongoose.set('useCreateIndex', true);
mongoose.set('bufferCommands', false);

export default (config: Config<object>): Promise<Mongoose> => connect(mongoose, config);
