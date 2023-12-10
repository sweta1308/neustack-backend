const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
const User = require("../models/user.model");

const fs = require("fs");
const jsonData = fs.readFileSync("./data/users.json", "utf8");
const users = JSON.parse(jsonData);

// seed user database
const seedUsersDatabase = async () => {
  try {
    for (const user of users) {
      const { name, email, password, cart, orders } = user;
      const salt = await bcrypt.genSalt(10);
      const hashedPassword = await bcrypt.hash(password, salt);
      const newUser = new User({
        name,
        email,
        password: hashedPassword,
        cart,
        orders,
      });
      await newUser.save();
      console.log(`User ${name} added`);
    }
    console.log("User database seeded successfully");
  } catch (error) {
    console.error("Error while seeding users database", error);
  } finally {
    mongoose.disconnect();
  }
};

module.exports = seedUsersDatabase;
