const express = require("express");
const router = express.Router();
const {
  signUp,
  signIn,
  showUser,
  indexProducts,
  showOneIndex,
  showVariantIndex,
  indexSearchProducts,
} = require("../controllers/publicController");

//user routes
router.post("/sign-up", signUp);
router.post("/sign-in", signIn);
router.post("/users/:userUsername", showUser);

// buyer routes
router.get("/products", indexProducts);
router.get("/products/:productId", showOneIndex);
router.get("/products/:productId/variants", showVariantIndex);

module.exports = router;
