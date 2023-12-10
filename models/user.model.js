const mongoose = require("mongoose");

const cartSchema = new mongoose.Schema({
  imgUrl: { type: String, required: true },
  item: { type: String, required: true },
  price: { type: Number, required: true },
  quantity: { type: Number, required: true },
});

const orderSchema = new mongoose.Schema({
  order: [cartSchema],
  discountEligible: Boolean,
  discountCode: String,
  totalAmount: Number,
  totalItems: Number,
  totalDiscountAmount: Number,
});

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
  cart: [cartSchema],
  orders: [orderSchema],
});

const User = mongoose.model("User", userSchema);

module.exports = User;
