import mongoose from 'mongoose';

import connect from './connect';
import queries from './queries';

export const schema = client => queries(client);

export const close = mongo => mongo.disconnect();

export default async config => await connect(mongoose, config);
