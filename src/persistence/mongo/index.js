import { MongoClient } from 'mongodb';
import connect from './connect';
import queries from './queries';

export const schema = client => queries(client);

export const close = mongo => mongo.close();

export default async config => await connect(MongoClient, config);
