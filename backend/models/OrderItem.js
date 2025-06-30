const mongoose = require("mongoose");
const {
  DELIVERY_STATUS_VARIANT,
  DELIVERY_TIMELINE,
} = require("../constants/shared/deliveryCondition");

const orderItemSchema = new mongoose.Schema(
  {
    mainOrder: {
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
    orderItemQty: {
      type: Number,
      required: [true, "Missing Ordered Qty for Ordered Product Var"],
      min: [1, "Ordered Qty cannot be negative quantity"],
    },
    productVarId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "ProductVariant",
      required: [true, "Missing Product Variant reference"],
    },
    orderItemPrice: {
      // take from ProductVar schema
      type: Number,
      required: [true, "Missing Price for Ordered Product Var"],
      min: [0, "Price cannot be negative quantity"],
      // Probably want a validator that ensures that the value has 2 decimal places ONLY
    },
    orderItemDefaultDeliveryTime: {
      // take from Product schema
      // in days
      type: Number,
      default: 30,
      min: [1, "Delivery Time should not be less than a day."],
    },
    orderItemDeliveryStatus: {
      type: String,
      default: "Pending Seller Confirmation",
      enum: {
        values: DELIVERY_STATUS_VARIANT,
        message: "Delivery Status should be one of the defined types",
      },
    },
    orderedItemDeliveryTimeline: {
      type: String,
      default: "Pending",
      enum: {
        values: DELIVERY_TIMELINE,
        message: "Delivery Timeline should be one of the defined types",
      },
    },
  },
  { timestamps: true } // to track when ordered Status changes
);

const OrdeItem = mongoose.model("OrderItem", orderItemSchema);

module.exports = OrdeItem;
