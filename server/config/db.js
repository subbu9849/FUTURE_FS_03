// config/db.js
// MongoDB Atlas connection using Mongoose

const mongoose = require('mongoose');

const connectDB = async () => {
  try {
    const conn = await mongoose.connect(process.env.MONGODB_URI, {
      // Mongoose 8+ no longer needs these options explicitly,
      // but keeping them for clarity on older environments.
      // useNewUrlParser: true,
      // useUnifiedTopology: true,
    });

    console.log(`✅  MongoDB Connected: ${conn.connection.host}`);
    console.log(`📦  Database: ${conn.connection.name}`);

    // Connection event listeners
    mongoose.connection.on('disconnected', () => {
      console.warn('⚠️   MongoDB disconnected. Attempting to reconnect...');
    });

    mongoose.connection.on('reconnected', () => {
      console.log('✅  MongoDB reconnected.');
    });

    mongoose.connection.on('error', (err) => {
      console.error('❌  MongoDB connection error:', err.message);
    });

  } catch (error) {
    console.error('❌  MongoDB connection failed:', error.message);
    // Exit process with failure so Render/PM2 can restart the server
    process.exit(1);
  }
};

module.exports = connectDB;