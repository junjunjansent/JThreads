const express = require("express");
const router = express.Router();
const { showCart, updateCart } = require("../controllers/cartController");

// specific routes
router.get("/", showCart);
router.put("/", updateCart); //would be great to use patch

module.exports = router;
