const express = require("express");
const productRouter = express.Router();
const { readAllProducts } = require("../controllers/product.controller");

// get all products
productRouter.get("/", async (req, res) => {
  try {
    const products = await readAllProducts();
    res.json({ products });
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch all products." });
  }
});

module.exports = productRouter;
