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

interface Args {
  payload?: any;
  config?: Config<object>;
}

interface LoggableArgs extends Args {
  uuid?: Function;
  json?: any;
  log?: any;
}

export interface ServiceArgs extends LoggableArgs {
  db: any;
}

export interface RouteArgs extends LoggableArgs {
  services?: any;
  validate?: Joi;
}

export interface QueryArgs extends Args {
  client: any;
}
export interface CrudApiArgs {
  services(db): object;
  dbConnect(config: Config<{}>): Promise<Connection> | SchemaBuilder;
  schema: any;
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
