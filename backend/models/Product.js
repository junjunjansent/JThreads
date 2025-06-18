// temporary use import because vite installed "type": "module" in package.json
// const mongoose = require("mongoose");
import mongoose from "mongoose";

// note capitalisation, it is an object wrapper type
const productSchema = new mongoose.Schema({
  productdetails: {
    productname: {
      type: String,
      unique: true,
      required: [true, "product name needs to be defined"],
    },
    productsize: {
      type: String,
      //   unique: ** we probably will want sizes to be unique at the product name level **
      required: [true, "product size needs to be defined"],
    },
    productcolor: {
      type: String,
      required: [true, "product color needs to be defined"],
    },
    productquantity: {
      type: Number,
      min: [0, "cannot be negative quantity"],
    },
    productprice: {
      type: Number,
      // Probably want a validator that ensures that the value has 2 decimal places ONLY
    },
    productimg: {
      type: String,
      match: [/https:\/\/\.com\/a\//i, "invalid img URL"], // need to validate regex here
    },
  },
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
// module.exports = User;
export { Product };
