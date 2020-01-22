import mongoose from 'mongoose';
import uuid from 'uuid';

const Schema = mongoose.Schema;

const UserSchema = new Schema({
 uuid: { type: String, default: uuid.v4 },
 firstname: { type: String, required: true },
 lastname: { type: String, required: true },
 created: { type: Date, default: Date.now }
});

const User = mongoose.model('User', UserSchema);

export default User;
