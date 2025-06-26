const mongoose = require("mongoose");

const productVariationSchema = new mongoose.Schema({
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
    match: [/https:\/\/\.com\/a\//i, "invalid image URL"], // need to validate regex here but effectively want to validate if this is a legitimate URL
  },

  // in preparation for when we do referencing
  assignee: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Product",
  },
});

const ProductVariation = mongoose.model(
  "ProductVariation",
  productVariationSchema
);

module.exports = ProductVariation;
