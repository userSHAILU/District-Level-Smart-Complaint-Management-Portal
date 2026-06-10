const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
require('dotenv').config();

const User = require('./models/User');

const seedAdmin = async () => {
  try {
    // Connect to MongoDB
    await mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost:27017/jansewa', {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log('MongoDB connected');

    // Check if admin already exists
    const existingAdmin = await User.findOne({ email: 'admin@1234' });
    
    if (existingAdmin) {
      console.log('Admin user already exists');
      process.exit(0);
    }

    // Create default admin
    const adminUser = new User({
      username: 'Admin',
      email: 'admin@1234',
      password: 'Admin@1234',
      role: 'admin',
    });

    await adminUser.save();
    console.log('Default admin user created successfully:');
    console.log('Username: Admin');
    console.log('Email: admin@1234');
    console.log('Password: Admin@1234');
    console.log('Role: admin');

    process.exit(0);
  } catch (error) {
    console.error('Error seeding admin user:', error);
    process.exit(1);
  }
};

seedAdmin();
