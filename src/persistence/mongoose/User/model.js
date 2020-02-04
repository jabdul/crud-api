import mongoose from 'mongoose';
import uuid from 'uuid';

const Schema = mongoose.Schema;

export const MetaSchema = new Schema({
  active: { type: Boolean, default: true },
  updated: { type: Date },
  created: { type: Date },
},
  { _id: false },
);


const UserSchema = new Schema({
  uuid: { type: String, default: uuid.v4 },
  firstname: { type: String, required: true },
  lastname: { type: String, required: true },
  meta: { type: MetaSchema },
});

const User = mongoose.model('Users', UserSchema);

export default User;
