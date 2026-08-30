import mongoose from 'mongoose';
import dotenv from 'dotenv';

dotenv.config();

async function main() {
  try {
    await mongoose.connect(process.env.MONGODB_URI);
    console.log('✅ Connected to MongoDB successfully');
  } catch (err) {
    console.error('❌ Connection failed:', err.message);
  } finally {
    await mongoose.disconnect();
  }
}

main();