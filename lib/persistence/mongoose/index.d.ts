import mongoose from 'mongoose';
import { DbClient, Dict } from '../../';
import { Config } from 'convict';
export declare const schema: (client: DbClient) => Dict;
export declare const close: (mongo: typeof mongoose) => Promise<void>;
declare const _default: (config: Config<object>) => Promise<typeof mongoose>;
export default _default;
//# sourceMappingURL=index.d.ts.map