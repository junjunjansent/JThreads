const mongoose = require("mongoose");

const cartItemSchema = new mongoose.Schema({
  item: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "ProductVariant",
    required: [true, "Missing Product Variant reference"],
  },
  qty: {
    type: Number,
    required: [true, "Qty for Cart Item"],
    min: [0, "Cart Item Qty cannot be negative quantity"],
    validate: {
      validator: Number.isInteger,
      message: "Item Qty must be an Integer",
    },
  },
});

const cartSchema = new mongoose.Schema(
  {
    buyer: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: [true, "Missing Buyer for Order"],
      unique: true,
    },
    cartItems: [cartItemSchema],
  },
  { timestamps: true, versionKey: false }
);

const Cart = mongoose.model("Cart", cartSchema);

module.exports = Cart;
