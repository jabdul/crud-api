import { Mongoose } from 'mongoose';
import { DbClient, Dict } from '../../';
import { Config } from 'convict';
export declare const schema: (client: DbClient) => Dict;
export declare const close: (mongo: Mongoose) => Promise<void>;
declare const _default: (config: Config<object>) => Promise<Mongoose>;
export default _default;
//# sourceMappingURL=index.d.ts.map
