// This file contains sample data to help populate the database
// You can run this in MongoDB directly or use a seed script

// Users Collection - Default Demo Accounts
db.users.insertMany([
  {
    username: "admin",
    email: "admin@example.com",
    password: "$2a$10$...", // bcrypt hash of "password" - replace with actual hash
    role: "admin",
    createdAt: new Date(),
    updatedAt: new Date()
  },
  {
    username: "citizen",
    email: "citizen@example.com",
    password: "$2a$10$...", // bcrypt hash of "password" - replace with actual hash
    role: "citizen",
    createdAt: new Date(),
    updatedAt: new Date()
  }
]);

// Sample Complaints Collection
db.complaints.insertMany([
  {
    title: "Pothole on Main Street",
    description: "There is a large pothole near the traffic light on Main Street that is causing traffic hazards.",
    category: "Road Damage",
    location: "Main Street, City Center",
    image: null,
    status: "In Progress",
    createdBy: ObjectId("..."), // Replace with admin user ID
    resolvedBy: null,
    adminNotes: "Repair team has been assigned",
    createdAt: new Date(),
    updatedAt: new Date()
  },
  {
    title: "Garbage overflow at Park",
    description: "Garbage bins are overflowing at Central Park. Garbage is scattered around.",
    category: "Garbage Collection",
    location: "Central Park",
    image: null,
    status: "Pending",
    createdBy: ObjectId("..."), // Replace with citizen user ID
    resolvedBy: null,
    adminNotes: "",
    createdAt: new Date(),
    updatedAt: new Date()
  },
  {
    title: "Water Leakage from Main Pipe",
    description: "Water is leaking from a main supply pipe near Residential Complex A.",
    category: "Water Leakage",
    location: "Residential Complex A",
    image: null,
    status: "Resolved",
    createdBy: ObjectId("..."), // Replace with citizen user ID
    resolvedBy: ObjectId("..."), // Replace with admin user ID
    adminNotes: "Pipe has been repaired and water supply restored",
    createdAt: new Date(),
    updatedAt: new Date()
  },
  {
    title: "Street Light Not Working",
    description: "Street light at corner of Oak Street and Elm Street is not working for the past week.",
    category: "Street Light Problem",
    location: "Oak Street & Elm Street",
    image: null,
    status: "Pending",
    createdBy: ObjectId("..."), // Replace with citizen user ID
    resolvedBy: null,
    adminNotes: "",
    createdAt: new Date(),
    updatedAt: new Date()
  }
]);

// Notes:
// 1. Replace ObjectId(...) with actual MongoDB ObjectIds of created users
// 2. For password hashing, use bcryptjs with 10 salt rounds
// 3. Use MongoDB shell or a MongoDB client to run these commands
// 4. Alternatively, create a seed script in Node.js that connects and populates data
