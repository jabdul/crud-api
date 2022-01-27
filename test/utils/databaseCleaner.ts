import mongoose from 'mongoose';

afterEach(async () => {
  mongoose.connection.readyState == 1 && (await mongoose.connection.db.dropDatabase());
});
