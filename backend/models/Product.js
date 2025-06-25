const mongoose = require("mongoose");
const ProductVariation = require("./ProductVariation");

const productSchema = new mongoose.Schema(
  {
    productname: {
      type: String,
      unique: true,
      required: [true, "product name needs to be defined"],
    },
    productdetails: [ProductVariation],
    productdesc: {
      type: String,
      required: [true, "product description needs to be filled"],
    },
    productcategory: {
      type: String,
      enum: {
        values: ["Tops", "Bottoms", "Headwear", "Bags", "Accessories", "Misc"],
        message: "Products sold must fall in one of these categories",
      },
    },
  },
  { timestamps: true }
);

// Compile the schema into a model:
const Product = mongoose.model("Product", productSchema);

// Export the model:
module.exports = Product;
