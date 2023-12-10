const User = require("../models/user.model");

// get cart items
const readCartItems = async () => {
  try {
    const user = await User.find({});
    return user[0].cart;
  } catch (error) {
    throw error;
  }
};

// add item to the cart
const addItemToCart = async (product) => {
  try {
    const user = await User.find({});
    const firstUser = user[0];
    const updatedCart = [{ ...product, quantity: 1 }, ...firstUser.cart];
    const updatedUser = await User.findByIdAndUpdate(
      firstUser._id,
      {
        $set: { cart: updatedCart },
      },
      { new: true }
    );
    return updatedUser.cart;
  } catch (error) {
    throw error;
  }
};

// remove item from cart
const removeItemFromCart = async (productId) => {
  try {
    const user = await User.find({});
    const userCart = user[0].cart.filter(
      ({ _id }) => _id.toString() !== productId
    );
    user[0].cart = userCart;
    const updatedUser = await user[0].save();
    return updatedUser.cart;
  } catch (error) {
    throw error;
  }
};

// update quantity of cart item
const updateQuantityOfCartItem = async (productId, action) => {
  try {
    const user = await User.find({});
    const firstUser = user[0];
    const userCart = firstUser.cart.map((product) => {
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
    firstUser.cart = userCart;
    const updatedUser = await user[0].save();
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
