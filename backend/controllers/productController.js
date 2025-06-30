const Product = require("../models/Product");
const ProductVariant = require("../models/ProductVariant");
// const { getUserFromRequest } = require("../utils/tokenHandler");

// SELLER CREATING NEW PRODUCT
const createOne = async (req, res, next) => {
  try {
    // const user = getUserFromRequest(req);
    // req.body.productOwner = user._id;
    const createProduct = await Product.create(req.body);
    res.status(201).json({ product: createProduct });
  } catch (err) {
    next(err);
  }
};

const editOne = async (req, res, next) => {
  try {
    const productId = req.params.productId;
    const productEdit = req.body;
    // const createProduct = await Product.findByIdAndUpdate(productId, req.body);
    await Product.findByIdAndUpdate(productId, productEdit);
    const updatedProduct = await Product.findById(productId);
    res.status(201).json(updatedProduct);
  } catch (err) {
    next(err);
  }
};

const createOneVariant = async (req, res, next) => {
  try {
    // const mainProduct = req.params.productId;
    const variantData = { ...req.body, mainProduct: req.params.productId };
    const createProduct = await ProductVariant.create(variantData);
    res.status(201).json({ product: createProduct });
  } catch (err) {
    next(err);
  }
};
module.exports = { createOne, editOne, createOneVariant };
