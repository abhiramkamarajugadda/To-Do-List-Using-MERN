const mongoose = require('mongoose');

const connectDB = async () => {
  const uri = process.env.MONGODB_URI || 'mongodb://127.0.0.1:27017/todo_db';

  try {
    const isAtlas = uri.startsWith('mongodb+srv://');
    await mongoose.connect(uri, {
      serverSelectionTimeoutMS: isAtlas ? 10000 : 3000,
    });
    console.log(`[MongoDB Connected] Successfully connected to ${isAtlas ? 'MongoDB Atlas Cloud' : 'MongoDB'}: database "${mongoose.connection.name}" at ${mongoose.connection.host}`);
  } catch (primaryError) {
    console.warn(`[MongoDB Notice] Could not connect to primary MongoDB at ${uri.replace(/:([^:@]+)@/, ':****@')} (${primaryError.message}).`);
    
    // Fallback: Start an in-memory MongoDB instance so the app runs out-of-the-box
    try {
      console.log('[MongoDB Fallback] Starting in-memory MongoDB server for testing & demonstration...');
      const { MongoMemoryServer } = require('mongodb-memory-server');
      const mongod = await MongoMemoryServer.create({
        instance: {
          dbName: 'todo_db',
        },
      });
      const memoryUri = mongod.getUri();
      await mongoose.connect(memoryUri);
      console.log(`[MongoDB Connected] In-memory MongoDB running at: ${memoryUri} (database: todo_db)`);
      console.log('[MongoDB Tip] To connect to MongoDB Atlas or local MongoDB service, update MONGODB_URI in server/.env');
    } catch (fallbackError) {
      console.error('[MongoDB Error] Failed to connect to any MongoDB instance:', fallbackError.message);
      process.exit(1);
    }
  }
};

module.exports = connectDB;
