const express = require("express");
const router = express.Router();
const {
  createOne,
  editOne,
  createOneVariant,
} = require("../controllers/productController");

// specific routes
router.post("/", createOne);
router.put("/:productId", editOne);
router.post("/:productId", createOneVariant);

module.exports = router;
