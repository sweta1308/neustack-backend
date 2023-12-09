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
        password,
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

// signup
const signup = async (userDetails) => {
  try {
    const user = new User({
      ...userDetails,
      cart: [],
      orders: [],
    });
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(user.password, salt);
    user.password = hashedPassword;
    const createdUser = await user.save();
    return createdUser;
  } catch (error) {
    console.error("Error saving user:", error);
    throw error;
  }
};

// login
const login = async (email, password) => {
  try {
    const foundUser = await User.findOne({ email });
    const passwordMatch = await bcrypt.compare(password, foundUser.password);
    if (foundUser && passwordMatch) {
      return foundUser;
    } else {
      throw new Error("Invalid credentials.");
    }
  } catch (error) {
    throw error;
  }
};

module.exports = { seedUsersDatabase, signup, login };
