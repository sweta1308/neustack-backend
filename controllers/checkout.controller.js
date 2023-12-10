const User = require("../models/user.model");

const checkout = async () => {
  try {
    const user = await User.find({});
    const newObj = {
      order: [],
      discountEligible: false,
      discountCode: "",
      totalAmount: 0,
      totalItems: 0,
    };
    if (user[0].cart.length > 0) {
      newObj.order = user[0].cart;
    }
    if (user[0].orders.length % 4 === 0) {
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
    user[0].cart = [];
    user[0].orders = [{ ...newObj }, ...user[0].orders];
    const updatedUser = await user[0].save();
    return updatedUser;
  } catch (error) {
    throw error;
  }
};

module.exports = checkout;
