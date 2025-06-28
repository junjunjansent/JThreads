const express = require("express");
const router = express.Router();
const {
  signUp,
  signIn,
  showUser,
  indexProducts,
  showOneIndex,
  showVariantIndex,
} = require("../controllers/publicController");

//user routes
router.post("/sign-up", signUp);
router.post("/sign-in", signIn);
router.post("/users/:userUsername", showUser);

// buyer routes
router.get("/products", indexProducts);
router.get("/products/:productId", showOneIndex, showVariantIndex);

module.exports = router;
