const mongoose = require("mongoose");
import { ProductVariation } from "./ProductVariation"; // TODO: To Amend

const productSchema = new mongoose.Schema({
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
});

// Compile the schema into a model:
const Product = mongoose.model("Product", productSchema);

// Export the model:
module.exports = Product;
