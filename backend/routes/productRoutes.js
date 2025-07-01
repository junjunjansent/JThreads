const express = require("express");
const router = express.Router();
const {
  createOne,
  editOne,
  createOneVariant,
  editOneVariant,
} = require("../controllers/productController");

// specific routes
router.post("/", createOne);
router.put("/:productId", editOne);
router.post("/:productId", createOneVariant);
router.put("/:productId/:variantId", editOneVariant);

module.exports = router;
