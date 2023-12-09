const mongoose = require("mongoose");
const { Item } = require("../models/item.model");

const fs = require("fs");
const jsonData = fs.readFileSync("./data/products.json", "utf8");
const products = JSON.parse(jsonData);

// seed products database
const seedProductsDatabase = async () => {
  try {
    for (const product of products) {
      const { item, price } = product;
      const newProduct = new Item({
        item,
        price,
      });
      await newProduct.save();
      console.log(`New product ${item} added`);
    }
    console.log("Products data seeded successfully");
  } catch (error) {
    console.error("Error while seeding products database", error);
  } finally {
    mongoose.disconnect();
  }
};

// get all products
const readAllProducts = async () => {
  try {
    const products = await Item.find({});
    return products;
  } catch (error) {
    throw error;
  }
};

module.exports = { seedProductsDatabase, readAllProducts };
