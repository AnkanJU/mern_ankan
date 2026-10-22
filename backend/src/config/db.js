// backend/src/config/db.js
import mongoose from 'mongoose';

export const connectDB = async () => {
  try {
    const conn = await mongoose.connect(process.env.MONGO_URI);
    console.log(`[database]: MongoDB Connected successfully: ${conn.connection.host}`);
  } catch (error) {
    console.error(`[database error]: Error connecting to MongoDB: ${error.message}`);
    process.exit(1); // Exit process with failure
  }
};