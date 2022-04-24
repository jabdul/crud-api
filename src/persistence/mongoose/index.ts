import mongoose, { Mongoose } from 'mongoose';

import connect from './connect';
import createCollection from './createCollection';
import createIndex from './createIndex';
import queries from './queries';
import { DbClient, Dict } from '../../';
import { Config } from 'convict';

export const schema = (client: DbClient): Dict => queries(client);

export const close = (mongo: Mongoose): Promise<void> => mongo.disconnect();

mongoose.set('bufferCommands', false);

const pipePromiseFns = (...fns) => x => fns.reduce((y, f) => y.then(f), Promise.resolve(x));

export default (config: Config<object>): Promise<Mongoose> =>
  pipePromiseFns(connect(config), createCollection, createIndex(config))(mongoose);
