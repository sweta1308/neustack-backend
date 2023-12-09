const User = require("../models/user.model");

const generateCoupon = async (userId) => {
  try {
    const user = await User.findById(userId);
    if (user.orders[0].discountEligible) {
      user.orders[0].discountCode = "DISCOUNT10";
    }
    const updatedUser = await user.save();
    return updatedUser;
  } catch (error) {
    throw error;
  }
};

const generateStats = async (userId) => {
  try {
    const user = await User.findById(userId);
    user.cart = [];
    if (user.orders[0].discountEligible) {
      user.orders[0].totalDiscountAmount = user.orders[0].totalAmount * 0.9;
    }
    const updatedUser = await user.save();
    return updatedUser;
  } catch (error) {
    throw error;
  }
};

module.exports = { generateCoupon, generateStats };
