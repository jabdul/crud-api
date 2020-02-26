import mongoose from 'mongoose';

afterEach(async () => {
  mongoose.connection.readyState && (await mongoose.connection.db.dropDatabase());
});
