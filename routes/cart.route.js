const express = require("express");
const cartRouter = express.Router();
const {
  readCartItems,
  addItemToCart,
  removeItemFromCart,
  updateQuantityOfCartItem,
} = require("../controllers/cart.controller");

const checkout = require("../controllers/checkout.controller");

// get cart items
cartRouter.get("/", async (req, res) => {
  try {
    const cart = await readCartItems();
    res.json({ cart });
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch cart items." });
  }
});

// add item to cart
cartRouter.post("/", async (req, res) => {
  try {
    const { product } = req.body;
    const cart = await addItemToCart(product);
    res.status(201).json({ cart, message: "Item added to cart." });
  } catch (error) {
    res.status(500).json({ error: "Failed to add item to the cart." });
  }
});

// remove item from cart
cartRouter.delete("/:productId", async (req, res) => {
  try {
    const productId = req.params.productId;
    const cart = await removeItemFromCart(productId);
    res.status(200).json({ cart, message: "Item removed from the cart." });
  } catch (error) {
    res.status(500).json({ error: "Failed to remove item from the cart." });
  }
});

// update quantity of cart item
cartRouter.post("/:productId", async (req, res) => {
  try {
    const productId = req.params.productId;
    const { action } = req.body;
    const cart = await updateQuantityOfCartItem(productId, action);
    res
      .status(200)
      .json({ cart, message: "Quantity of an item updated in the cart." });
  } catch (error) {
    res
      .status(500)
      .json({ error: "Failed to update quantity of an item from the cart." });
  }
});

cartRouter.get("/checkout", async (req, res) => {
  try {
    const updatedUser = await checkout();
    res.status(200).json({
      user: updatedUser,
      message: "Checkout successful.",
    });
  } catch (error) {
    res.status(500).json({ error: "Failed to checkout from the cart." });
  }
});

module.exports = cartRouter;
