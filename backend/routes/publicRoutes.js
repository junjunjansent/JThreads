const express = require("express");
const router = express.Router();
const { signUp, signIn } = require("../controllers/publicController");
const { index } = require("../controllers/productController");

router.post("/sign-up", signUp);
router.post("/sign-in", signIn);
router.get("/products", index);

module.exports = router;
