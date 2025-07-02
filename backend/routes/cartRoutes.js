const express = require("express");
const router = express.Router();
const {
  showCart,
  createCart,
  updateCart,
  destroyCart,
} = require("../controllers/cartController");

// specific routes
router.get("/", showCart);
router.post("/", createCart);
router.put("/", updateCart); //would be great to use patch
router.delete("/", destroyCart);

module.exports = router;
