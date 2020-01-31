import mongoose from 'mongoose';
import paginate from 'mongoose-paginate';
import uuid from 'uuid';

paginate.paginate.options = {
  limit: 100,
};

const Schema = mongoose.Schema;

const UserSchema = new Schema({
 uuid: { type: String, default: uuid.v4 },
 firstname: { type: String, required: true },
 lastname: { type: String, required: true },
 created: { type: Date, default: Date.now }
});

UserSchema.plugin(paginate);

const User = mongoose.model('User', UserSchema);

export default User;
