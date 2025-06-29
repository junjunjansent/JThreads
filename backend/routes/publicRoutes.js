const express = require("express");
const router = express.Router();
const {
  signUp,
  signIn,
  showUser,
  indexProducts,
  // indexUserProducts,
  showOneIndex,
  showVariantIndex,
} = require("../controllers/publicController");

//user routes
router.post("/sign-up", signUp);
router.post("/sign-in", signIn);
router.get("/users/:userUsername", showUser);

// buyer routes
router.get("/products", indexProducts);
router.get("/products/:productId", showOneIndex);
router.get("/products/:productId/variants", showVariantIndex);
router.get("/:userUsername", indexProducts); // TODO: are we putting this in user or buyer route? //Jansen, this should be handled under products via a query search

module.exports = router;
