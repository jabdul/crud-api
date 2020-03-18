import mongoose, { Document, Schema } from "mongoose";
import uuid from "uuid";

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

export const MetaSchema = new mongoose.Schema(
  {
    active: { type: Boolean, default: true },
    updated: { type: Date },
    created: { type: Date }
  },
  { _id: false }
);

const UserSchema = new mongoose.Schema({
  uuid: { type: String, default: uuid.v4 },
  firstname: { type: String, required: true },
  lastname: { type: String, required: true },
  meta: { type: MetaSchema }
});

type User = mongoose.Model<UserI>;

const User = mongoose.model<UserI>("Users", UserSchema);

export default User;
