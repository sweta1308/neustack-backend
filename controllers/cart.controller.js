const User = require("../models/user.model");

// get cart items
const readCartItems = async (userId) => {
  try {
    const user = await User.findById(userId);
    return user.cart;
  } catch (error) {
    throw error;
  }
};

// add item to the cart
const addItemToCart = async (userId, product) => {
  try {
    const user = await User.findById(userId);
    const updatedCart = [{ ...product, quantity: 1 }, ...user.cart];
    const updatedUser = await User.findByIdAndUpdate(
      userId,
      {
        $set: { cart: updatedCart },
      },
      { new: true }
    );
    return updatedUser.cart;
  } catch (error) {
    console.log(error);
    throw error;
  }
};

// remove item from cart
const removeItemFromCart = async (userId, productId) => {
  try {
    const user = await User.findById(userId);
    const userCart = user.cart.filter(
      ({ _id }) => _id.toString() !== productId
    );
    user.cart = userCart;
    const updatedUser = await user.save();
    return updatedUser.cart;
  } catch (error) {
    throw error;
  }
};

// update quantity of cart item
const updateQuantityOfCartItem = async (userId, productId, action) => {
  try {
    const user = await User.findById(userId);
    const userCart = user.cart.map((product) => {
      if (product._id.toString() === productId) {
        switch (action.type) {
          case "increment":
            return { ...product, quantity: product.quantity + 1 };
          case "decrement":
            return { ...product, quantity: product.quantity - 1 };
          default:
            throw new Error("Invalid action type.");
        }
      } else {
        return product;
      }
    });
    user.cart = userCart;
    const updatedUser = await user.save();
    return updatedUser.cart;
  } catch (error) {
    throw error;
  }
};

module.exports = {
  readCartItems,
  addItemToCart,
  removeItemFromCart,
  updateQuantityOfCartItem,
};
