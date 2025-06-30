const mongoose = require("mongoose");

const productVariantSchema = new mongoose.Schema(
  {
    mainProduct: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Product",
      required: [true, "All product variants sold must belong to one owner."],
    },
    productVarDesign: {
      type: String,
      trim: true,
      required: [true, "Product Design needs to be defined"],
      //   unique: ** we probably will want sizes to be unique at the product name level ** // Can explore! This is actually important but not sure how to implement
    },
    // productcolor: {
    //   type: String,
    //   required: [true, "product color needs to be defined"],
    // },
    productVarInventoryQty: {
      type: Number,
      required: [true, "Inventory Qty needs to be defined"],
      min: [0, "Inventory quantity cannot be negative quantity"],
      validate: {
        validator: Number.isInteger,
        message: "Inventory Qty must be an Integer",
      },
    },
    productVarAvailableQty: {
      type: Number,
      required: [true, "Available Qty needs to be defined"],
      min: [0, "Available quantity cannot be negative quantity"],
      validate: {
        validator: function (value) {
          return (
            value <= this.productVarInventoryQty && Number.isInteger(value)
          );
        },
        message: "Available quantity must be an Integer <= Inventory Qty",
      },
    },
    productVarPrice: {
      type: Number,
      required: [true, "Price needs to be defined"],
      min: [0, "Price cannot be negative quantity"],
      // Probably want a validator that ensures that the value has 2 decimal places ONLY
    },
    productVarDisplayPhoto: {
      type: String,
      trim: true,
      // match: [/https:\/\/\.com\/a\//i, "Invalid image URL"], // need to validate regex here but effectively want to validate if this is a legitimate URL
    },
  },
  { timestamps: true }
);

const ProductVariant = mongoose.model("ProductVariant", productVariantSchema);

module.exports = ProductVariant;
