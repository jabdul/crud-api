/// <reference types="mongoose" />
/// <reference types="mongoose-paginate" />
import { Config } from 'convict';
declare const _default: (
  mongoose: typeof import('mongoose'),
  config: Config<object>
) => Promise<typeof import('mongoose')>;
export default _default;
