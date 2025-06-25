const mongoose = require("mongoose");
// const ProductVariation = require("./ProductVariation");

const productSchema = new mongoose.Schema(
  {
    productName: {
      type: String,
      // unique: true, // I think its ok that it isnt unique, but they will be difficult to find
      required: [true, "Product name needs to be defined"],
      trim: true,
    },
    productIsActive: { type: Boolean, default: true },
    productDescription: {
      type: String,
      trim: true,
    },
    productCategory: {
      type: String,
      required: [true, "Product needs to belong in a category."],
      trim: true,
      enum: {
        values: ["Tops", "Bottoms", "Headwear", "Bags", "Accessories", "Misc"],
        message: "Products sold must fall in one of these categories",
      },
    },
    productOwner: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: [true, "All products sold must have an owner."],
    },
    productDisplayPhoto: {
      type: String,
      default:
        "https://pixabay.com/illustrations/box-packaging-mockup-paper-box-6345764/",
    },
    productDefaultDeliveryTime: {
      // in days
      type: Number,
      default: 30,
      min: [1, "Delivery Time should not be less than a day."],
    },
  },
  { timestamps: true }
);

const Product = mongoose.model("Product", productSchema);

module.exports = Product;
