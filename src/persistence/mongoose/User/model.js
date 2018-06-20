import mongoose from 'mongoose';

const Schema = mongoose.Schema;

const UserSchema = new Schema({
 uuid: String,
 firstname: String,
 lastname: String,
 created: { type: Date, default: Date.now }
});

const User = mongoose.model('User', UserSchema);

export default User;
