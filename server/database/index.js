import mongoose from 'mongoose';

import 'dotenv/config';
const { MONGODB_URI } = process.env;
class DB {
  static async connect() {
    await mongoose.connect(MONGODB_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true
    });
    console.log('connection successful');
    return mongoose.connection;
  }
  
}

export default DB;
