import mongoose from "mongoose";

const productVariationSchema = new mongoose.Schema({
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
});

const Product = mongoose.model("ProductVariation", productVariationSchema);

export { ProductVariation };
