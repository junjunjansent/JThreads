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
router.put("/:cartId", updateCart); //would be great to use patch
router.delete("/:cartId", destroyCart);

module.exports = router;
