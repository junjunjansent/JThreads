const express = require("express");
const router = express.Router();
const { createOne } = require("../controllers/productController");

// specific routes
router.post("/", createOne);

module.exports = router;
