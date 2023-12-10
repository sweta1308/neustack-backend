const User = require("../models/user.model");

const generateCoupon = async () => {
  try {
    const users = await User.find({});
    if (users[0].orders[0].discountEligible) {
      users[0].orders[0].discountCode = "DISCOUNT10";
    }
    const updatedUser = await users[0].save();
    return updatedUser;
  } catch (error) {
    throw error;
  }
};

const generateStats = async () => {
  try {
    const user = await User.find({});
    if (user[0].orders[0].discountEligible) {
      user[0].orders[0].totalDiscountAmount = user[0].orders[0].totalAmount * 0.9;
    }
    const updatedUser = await user[0].save();
    return updatedUser;
  } catch (error) {
    throw error;
  }
};

module.exports = { generateCoupon, generateStats };
