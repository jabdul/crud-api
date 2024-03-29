import setupConfig, { conf as env, dbConfig } from './config';
import serverFactory from './server';
import mysqlConnect from './persistence/mysql';
import mongooseConnect from './persistence/mongoose';
import Joi from 'joi';
import { Config } from 'convict';
import { Server, ServerOptions, ServerRoute } from '@hapi/hapi';
import { SchemaBuilder } from 'knex';
import { Mongoose } from 'mongoose';

export const server = ({
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
  loggerOptions,
  dockerized = false,
  intializers = [],
}: CrudApiArgs): Promise<CrudServer> =>
  serverFactory({
    dbConnect,
    schema,
    serverOptions,
    config: setupConfig(config, configFiles, configOptions),
    routes,
    services,
    plugins,
    postRegisterHook,
    swaggerOptions,
    loggerOptions,
    dockerized,
    intializers,
  });

const config = env;

export { mysqlConnect, mongooseConnect, config, dbConfig };

export type DbClient = Promise<Mongoose> | SchemaBuilder;
interface Args {
  payload?: any; // eslint-disable-line @typescript-eslint/no-explicit-any
  config?: Config<object>;
}

export type CrudJson = (shema: object) => (payload: object) => string;
interface LoggableArgs extends Args {
  log?: Function;
  json?: CrudJson;
}

export interface ServiceArgs extends LoggableArgs {
  db: Dict;
}

export interface RouteArgs extends LoggableArgs {
  services?: Dict;
  validate?: typeof Joi;
}

export type CrudServer = Server & { db?: DbClient; schema?: Dict };

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
  postRegisterHook?(app): Promise<void>;
  swaggerOptions: object;
  loggerOptions: object;
  dockerized?: boolean;
  intializers?: ((app?: CrudServer, config?: Config<object>) => Promise<void>)[];
}

export interface ServerArgs extends BaseArgs {
  config: Config<object>;
}

export interface CrudApiArgs extends BaseArgs {
  configOptions: object;
  configFiles: Array<string>;
}
