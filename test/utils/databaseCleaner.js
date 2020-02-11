import mongoose from 'mongoose';
import Cleaner from 'database-cleaner';

var dbCleaner = new Cleaner('mongodb');


afterEach(done => {
  (mongoose.connection.db && dbCleaner.clean(mongoose.connection.db, () => {
    done()
  })) || done() // short-circuit if we're not connected
});
