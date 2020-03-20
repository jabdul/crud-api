import setupConfig, { conf as env, dbConfig } from "./config";
import serverFactory from "./server";
import mysqlConnect from "./persistence/mysql";
import mongooseConnect from "./persistence/mongoose";
import Joi from "@hapi/joi";
import { Config } from "convict";
import { Server, ServerOptions } from "hapi";
import { SchemaBuilder } from "knex";
import { Connection } from "mongoose";

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
  loggerOptions
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
    loggerOptions
  });

const config = env;

export { mysqlConnect, mongooseConnect, config, dbConfig };

export type DbClient = Promise<Connection> | SchemaBuilder;
interface Args {
  payload?: any; // eslint-disable-line @typescript-eslint/no-explicit-any
  config?: Config<object>;
}

interface LoggableArgs extends Args {
  uuid?: Function;
  json?: Function;
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
  json?: Function;
}

export interface Crud<T> {
  create?(CrudArgs): Promise<T>;
  findAll?(CrudArgs): Promise<object | T[]>;
  findById?(CrudArgs): Promise<T>;
  removeById?(CrudApiArgs): Promise<void>;
  updateById?(CrudApiArgs): Promise<object>;
}

export type Dict = { [k: string]: Crud<any> }; // eslint-disable-line @typescript-eslint/no-explicit-any

export type Schema = (client: DbClient) => Dict;

export interface CrudApiArgs {
  services(db): object;
  dbConnect(config: Config<{}>): DbClient;
  schema: Schema;
  serverOptions: ServerOptions;
  config: object;
  configOptions: object;
  configFiles: Array<string>;
  routes(): Function[];
  plugins: object[];
  postRegisterHook(app): Promise<void>;
  swaggerOptions: object;
  swaggerUiOptions: object;
  loggerOptions: object;
}
