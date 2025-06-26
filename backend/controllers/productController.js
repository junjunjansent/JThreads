const Product = require("../models/Product");

// BUYER & PRODUCT INTERACTIONS
// show all products as buyer on search page
const displayAllProduct = async (req, res) => {
  try {
    const allProducts = await Product.find({});
    if (!allProducts) {
      return res.json("Msg: No products available");
    }
    res.json(allProducts);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
// show single product when using search bar on search page
// is there a way to do it such that we search for similar spelt products instead of a strict search?
const displayOneProduct = async (req, res) => {
  try {
    const oneProduct = await Product.findOne({ productname: req.query }); // need to confirm how the query is captured
    if (!oneProduct) {
      res.json("Msg: No products match your search query");
    }
    res.json(oneProduct);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// show products when searching by category
const displayAllProductByCategory = async (req, res) => {
  try {
    const allProductByCategory = await Product.find({
      productcategory: req.query,
    });
    if (!allProductByCategory) {
      res.json("Msg: No products in this category");
    }
    res.json(allProductByCategory);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

module.exports = {
  displayAllProduct,
  displayOneProduct,
  displayAllProductByCategory,
};
