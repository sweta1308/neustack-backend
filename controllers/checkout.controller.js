const User = require("../models/user.model");

const checkout = async (userId) => {
  try {
    const user = await User.findById(userId);
    const newObj = {
      order: [],
      discountEligible: false,
      discountCode: "",
      totalAmount: 0,
      totalItems: 0,
    };
    if (user.cart.length > 0) {
      newObj.order = user.cart;
    }
    if (user.orders.length % 4 === 0) {
      newObj.discountEligible = true;
    }
    const totalPrice = newObj.order.reduce(
      (acc, curr) => (acc += curr.price * curr.quantity),
      0
    );
    newObj.totalAmount = totalPrice;
    const totalProducts = newObj.order.reduce(
      (acc, curr) => (acc += curr.quantity),
      0
    );
    newObj.totalItems = totalProducts;
    user.orders = [{ ...newObj }, ...user.orders];
    const updatedUser = await user.save();
    return updatedUser;
  } catch (error) {
    throw error;
  }
};

module.exports = checkout;
