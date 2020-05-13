import Knex from 'knex';
import { Config } from 'convict';
import { Dict, DbClient } from 'src';
export declare const schema: (client: DbClient) => Dict;
export declare const close: (knex: Knex<any, any[]>) => Promise<void>;
declare const _default: (config: Config<{}>) => Knex<any, any[]>;
export default _default;
//# sourceMappingURL=index.d.ts.map
