import mongoose, { Connection } from 'mongoose';

import connect from './connect';
import queries from './queries';
import { DbClient, Dict } from '../../';

export const schema = (client: DbClient): Dict => queries(client);

export const close = (mongo): Promise<void> => mongo.disconnect();

mongoose.set('useCreateIndex', true);
mongoose.set('bufferCommands', false);

export default async (config): Promise<Connection> => connect(mongoose, config);
