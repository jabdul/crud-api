import convict from 'convict';
export declare const conf: {
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
declare const loadConfig: (appConfig: {}, configFiles: any, options?: {}) => convict.Config<object>;
export declare const dbConfig: convict.Config<object>;
export default loadConfig;
