import mongoose, { Connection } from "mongoose";

import connect from "./connect";
import queries from "./queries";

export const schema = client => queries(client);

export const close = mongo => mongo.disconnect();

mongoose.set("useCreateIndex", true);
mongoose.set("bufferCommands", false);

export default async (config): Promise<Connection> =>
  connect(mongoose, config);
