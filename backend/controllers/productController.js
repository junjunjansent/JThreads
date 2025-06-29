const Product = require("../models/Product");

// SELLER CREATING NEW PRODUCT
const createOne = async (req, res, next) => {
  try {
    const createProduct = await Product.create(req.body);
    res.status(201).json({ product: createProduct });
  } catch (err) {
    next(err);
  }
};

module.exports = { createOne };
