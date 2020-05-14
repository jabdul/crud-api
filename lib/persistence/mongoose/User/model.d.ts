import mongoose, { Document, Schema } from 'mongoose';
interface MetaFields {
  active: boolean;
  updated?: Date;
  created?: Date;
}
interface UserFields {
  uuid?: string;
  firstname: string;
  lastname: string;
  meta: MetaFields;
}
export interface UserI extends UserFields, Document {}
export declare const MetaSchema: Schema;
declare type User = mongoose.Model<UserI>;
declare const User: mongoose.Model<UserI, {}>;
export default User;
//# sourceMappingURL=model.d.ts.map
