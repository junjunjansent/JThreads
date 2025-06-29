const mongoose = require("mongoose");
const {
  DELIVERY_STATUS_VARIANT,
  DELIVERY_TIMELINE,
} = require("../../sharedConstants/delivery");

const orderSchema = new mongoose.Schema(
  {
    order: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: [true, "Missing Order for Ordered ProductVar"],
    },
    buyer: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: [true, "Missing Buyer for Ordered ProductVar"],
    },
    seller: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: [true, "Missing Seller for Ordered ProductVar"],
    },
    orderedQty: {
      type: Number,
      required: [true, "Missing Ordered Qty for Ordered Product Var"],
      min: [0, "Ordered Qty cannot be negative quantity"],
    },
    productVarId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "ProductVariant",
      required: [true, "Missing Product Variant reference"],
    },
    orderedVarPrice: {
      // take from ProductVar schema
      type: Number,
      required: [true, "Missing Price for Ordered Product Var"],
      min: [0, "Price cannot be negative quantity"],
      // Probably want a validator that ensures that the value has 2 decimal places ONLY
    },
    orderedProductDefaultDeliveryTime: {
      // take from Product schema
      // in days
      type: Number,
      default: 30,
      min: [1, "Delivery Time should not be less than a day."],
    },
    orderedVarDeliveryStatus: {
      // take from Product schema
      // in days
      type: String,
      default: "Pending Seller Confirmation",
      enum: {
        values: DELIVERY_STATUS_VARIANT,
        message: "Delivery Status should be one of the defined types",
      },
    },
    orderedVarDeliveryTimeline: {
      // take from Product schema
      // in days
      type: String,
      default: "Pending",
      enum: {
        values: DELIVERY_TIMELINE,
        message: "Delivery Timeline should be one of the defined types",
      },
    },
  },
  { timestamps: true }
);

const Order = mongoose.model("Order", orderSchema);

module.exports = Order;
