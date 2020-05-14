import setupConfig, { conf as env, dbConfig } from './config';
import serverFactory from './server';
import mysqlConnect from './persistence/mysql';
import mongooseConnect from './persistence/mongoose';
import * as Joi from '@hapi/joi';
import { Config } from 'convict';
import { Server, ServerOptions, ServerRoute } from 'hapi';
import { SchemaBuilder } from 'knex';
import { Mongoose } from 'mongoose';

export const server = async ({
  dbConnect,
  schema,
  serverOptions,
  config,
  configOptions,
  configFiles = [],
  routes,
  services,
  plugins,
  postRegisterHook,
  swaggerOptions,
  swaggerUiOptions,
  loggerOptions,
}: CrudApiArgs): Promise<Server> =>
  await serverFactory({
    dbConnect,
    schema,
    serverOptions,
    config: setupConfig(config, configFiles, configOptions),
    routes,
    services,
    plugins,
    postRegisterHook,
    swaggerOptions,
    swaggerUiOptions,
    loggerOptions,
  });

const config = env;

export { mysqlConnect, mongooseConnect, config, dbConfig };

export type DbClient = Promise<Mongoose> | SchemaBuilder;
interface Args {
  payload?: any; // eslint-disable-line @typescript-eslint/no-explicit-any
  config?: Config<object>;
}

interface LoggableArgs extends Args {
  log?: Function;
}

export interface ServiceArgs extends LoggableArgs {
  db: Dict;
}

export interface RouteArgs extends LoggableArgs {
  services?: Dict;
  validate?: Joi;
}

export interface QueryArgs extends Args {
  client: DbClient;
}

interface CrudArgs extends Args {
  db?: Dict;
  client?: DbClient;
}

/* eslint-disable @typescript-eslint/no-explicit-any */
export interface Crud<T> {
  create?(CrudArgs): Promise<T>;
  findAll?(CrudArgs): Promise<object | T[]>;
  findById?(CrudArgs): Promise<T>;
  removeById?(CrudApiArgs): Promise<T | object | any>;
  updateById?(CrudApiArgs): Promise<T | object | any>;
}

export type Dict = { [k: string]: Crud<any> };

export type Schema = (client: DbClient) => Dict;

export type Route = ({ services, config, validate }: RouteArgs) => ServerRoute;

export type Service = (db: Dict) => Dict;

export type Query<T> = Crud<T>;

interface BaseArgs {
  services: Service;
  dbConnect(config: Config<{}>): DbClient;
  schema: Schema;
  serverOptions: ServerOptions;
  config: Config<object> | object;
  routes(): Route[];
  plugins: object[];
  postRegisterHook(app): Promise<void>;
  swaggerOptions: object;
  swaggerUiOptions: object;
  loggerOptions: object;
}

export interface ServerArgs extends BaseArgs {
  config: Config<object>;
}

export interface CrudApiArgs extends BaseArgs {
  configOptions: object;
  configFiles: Array<string>;
}
