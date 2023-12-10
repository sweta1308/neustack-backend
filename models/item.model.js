const mongoose = require("mongoose");

const itemSchema = new mongoose.Schema({
  imgUrl: {
    type: String,
    required: true,
  },
  item: {
    type: String,
    required: true,
  },
  price: {
    type: Number,
    required: true,
  },
});

const Item = mongoose.model("Item", itemSchema);

module.exports = { Item, itemSchema };
