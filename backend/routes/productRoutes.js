const express = require("express");
const router = express.Router();
const { createOne, editOne } = require("../controllers/productController");

// specific routes
router.post("/", createOne);
router.put("/:productId", editOne);

module.exports = router;
