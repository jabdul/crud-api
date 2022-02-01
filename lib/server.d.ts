import Hapi from '@hapi/hapi';
import { Dict, ServerArgs } from './';
declare type ServerType = Hapi.Server & {
  db?: void | typeof import('mongoose');
  schema?: Dict;
};
declare const _default: ({
  dbConnect,
  schema,
  config,
  routes,
  services,
  plugins,
  postRegisterHook,
  swaggerOptions,
  loggerOptions,
  serverOptions,
}: ServerArgs) => Promise<ServerType>;
export default _default;
//# sourceMappingURL=server.d.ts.map
