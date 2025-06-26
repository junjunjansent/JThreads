const Product = require("../models/Product");

// BUYER & PRODUCT INTERACTIONS
// show all products as buyer on search page
const index = async (req, res, next) => {
  try {
    const allProducts = await Product.find({});
    if (!allProducts) {
      return res.json("Msg: No products available"); // we can remove this once we handle the state change front end to display a message
    }
    res.json(allProducts);
  } catch (err) {
    next(err);
  }
};
// show single product when using search bar on search page
// is there a way to do it such that we search for similar spelt products instead of a strict search?
const showOne = async (req, res, next) => {
  try {
    const oneProduct = await Product.findOne({ productname: req.query }); // need to confirm how the query is captured
    if (!oneProduct) {
      res.json("Msg: No products match your search query");
    }
    res.json(oneProduct);
  } catch (err) {
    next(err);
  }
};

// show products when searching by category
const indexCat = async (req, res, next) => {
  try {
    const allProductByCategory = await Product.find({
      productcategory: req.query,
    });
    if (!allProductByCategory) {
      res.json("Msg: No products in this category");
    }
    res.json(allProductByCategory);
  } catch (err) {
    next(err);
  }
};

// details when navigating to a product's page
const detailedProductDetails = async (req, res) => {
  try {
    const detailedOneProduct = await Product.findById({ _id: req.params });
  } catch (err) {}
};

module.exports = {
  displayAllProduct,
  displayOneProduct,
  displayAllProductByCategory,
};
