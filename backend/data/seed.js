require("dotenv").config({ path: __dirname + "/../.env" });

const connectDB = require("../config/db");
const { User } = require("../models/userModel");

const seedUsers = [
  { name: "Alice Dupont", email: "alice@example.com", role: "admin" },
  { name: "Bob Martin", email: "bob@example.com", role: "user" },
  { name: "Clara Petit", email: "clara@example.com", role: "user" },
];

const seed = async () => {
  await connectDB();

  const count = await User.countDocuments();

  if (count > 0) {
    console.log(`Collection already contains ${count} user(s). Skipping seed.`);
  } else {
    await User.insertMany(seedUsers);
    console.log("3 test users inserted successfully.");
  }

  process.exit(0);
};

seed();
