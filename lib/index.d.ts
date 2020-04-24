import { dbConfig } from './config';
import mysqlConnect from './persistence/mysql';
import mongooseConnect from './persistence/mongoose';
import * as Joi from '@hapi/joi';
import { Config } from 'convict';
import { Server, ServerOptions, ServerRoute } from 'hapi';
import { SchemaBuilder } from 'knex';
import { Mongoose } from 'mongoose';
export declare const server: ({ dbConnect, schema, serverOptions, config, configOptions, configFiles, routes, services, plugins, postRegisterHook, swaggerOptions, swaggerUiOptions, loggerOptions, }: CrudApiArgs) => Promise<Server>;
declare const config: {
    mongo: {
        host: {
            doc: string;
            format: StringConstructor;
            default: string;
            env: string;
            arg: string;
        };
        database: {
            doc: string;
            format: StringConstructor;
            default: string;
            env: string;
            arg: string;
        };
        user: {
            doc: string;
            format: StringConstructor;
            default: string;
            env: string;
            arg: string;
        };
        pass: {
            doc: string;
            format: StringConstructor;
            default: string;
            env: string;
            arg: string;
        };
    };
    env: {
        doc: string;
        format: string[];
        default: string;
        env: string;
    };
    server: {
        hostname: {
            doc: string;
            format: StringConstructor;
            default: string;
            env: string;
            arg: string;
        };
        port: {
            doc: string;
            format: string;
            default: number;
            env: string;
            arg: string;
        };
        tlsCert: {
            doc: string;
            format: StringConstructor;
            default: string;
            env: string;
            arg: string;
        };
        tlsKey: {
            doc: string;
            format: StringConstructor;
            default: string;
            env: string;
            arg: string;
        };
        tlsCa: {
            doc: string;
            format: StringConstructor;
            default: string;
            env: string;
            arg: string;
        };
        secure: {
            doc: string;
            format: BooleanConstructor;
            default: boolean;
            env: string;
            arg: string;
        };
        db: {
            doc: string;
            format: StringConstructor;
            default: string;
            env: string;
            arg: string;
        };
    };
    db: {
        dump: {
            doc: string;
            format: StringConstructor;
            default: string;
            env: string;
            arg: string;
        };
    };
    mysql: {
        host: {
            doc: string;
            format: StringConstructor;
            default: string;
            env: string;
            arg: string;
        };
        database: {
            doc: string;
            format: StringConstructor;
            default: string;
            env: string;
            arg: string;
        };
        user: {
            doc: string;
            format: StringConstructor;
            default: string;
            env: string;
            arg: string;
        };
        pass: {
            doc: string;
            format: StringConstructor;
            default: string;
            env: string;
            arg: string;
        };
    };
    jwt: {
        secret: {
            doc: string;
            format: StringConstructor;
            default: string;
            env: string;
            arg: string;
        };
        expires: {
            doc: string;
            format: NumberConstructor;
            default: number;
            env: string;
            arg: string;
        };
    };
};
export { mysqlConnect, mongooseConnect, config, dbConfig };
export declare type DbClient = Promise<Mongoose> | SchemaBuilder;
interface Args {
    payload?: any;
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
export interface Crud<T> {
    create?(CrudArgs: any): Promise<T>;
    findAll?(CrudArgs: any): Promise<object | T[]>;
    findById?(CrudArgs: any): Promise<T>;
    removeById?(CrudApiArgs: any): Promise<T | object | any>;
    updateById?(CrudApiArgs: any): Promise<T | object | any>;
}
export declare type Dict = {
    [k: string]: Crud<any>;
};
export declare type Schema = (client: DbClient) => Dict;
export declare type Route = ({ services, config, validate, uuid, json }: RouteArgs) => ServerRoute;
export declare type Service = (db: Dict) => Dict;
export declare type Query<T> = Crud<T>;
interface BaseArgs {
    services: Service;
    dbConnect(config: Config<{}>): DbClient;
    schema: Schema;
    serverOptions: ServerOptions;
    config: Config<object> | object;
    routes(): Route[];
    plugins: object[];
    postRegisterHook(app: any): Promise<void>;
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
