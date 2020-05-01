import Knex from 'knex';
import connect from './connect';
import queries from './queries';
import { Config } from 'convict';
import { Dict, DbClient } from 'src';

export const schema = (client: DbClient): Dict => queries(client);

export const close = (knex: Knex): Promise<void> => knex.destroy();

// eslint-disable-next-line @typescript-eslint/no-var-requires
export default (config: Config<{}>): Knex => require('knex')(connect(config));
