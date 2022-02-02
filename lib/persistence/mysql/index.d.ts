import Knex from 'knex';
import { Config } from 'convict';
import { Dict, DbClient } from '../../';
export declare const schema: (client: DbClient) => Dict;
export declare const close: (knex: Knex) => Promise<void>;
declare const _default: (config: Config<{}>) => Knex;
export default _default;
//# sourceMappingURL=index.d.ts.map
