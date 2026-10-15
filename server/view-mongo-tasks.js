const mongoose = require('mongoose');
const dotenv = require('dotenv');
const Task = require('./models/Task');

dotenv.config();

const viewTasks = async () => {
  const uri = process.env.MONGODB_URI || 'mongodb://127.0.0.1:27017/todo_db';

  try {
    console.log(`Connecting to MongoDB at: ${uri}`);
    await mongoose.connect(uri, { serverSelectionTimeoutMS: 4000 });

    console.log(`\n======================================================`);
    console.log(`  DATABASE: ${mongoose.connection.name}`);
    console.log(`  COLLECTION: tasks`);
    console.log(`======================================================\n`);

    const tasks = await Task.find().lean();

    if (tasks.length === 0) {
      console.log('No documents found in todo_db.tasks yet.');
    } else {
      console.table(
        tasks.map((t) => ({
          _id: t._id.toString(),
          taskName: t.taskName,
          isCompleted: t.isCompleted,
          createdAt: t.createdAt ? new Date(t.createdAt).toLocaleString() : 'N/A',
        }))
      );
    }

    console.log(`\nTotal Documents: ${tasks.length}`);
    await mongoose.disconnect();
    process.exit(0);
  } catch (error) {
    console.error('Failed to view MongoDB tasks:', error.message);
    console.log('\nMake sure MongoDB is running or check your connection URI in server/.env');
    process.exit(1);
  }
};

viewTasks();
