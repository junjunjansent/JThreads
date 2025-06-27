const express = require("express");
const router = express.Router();
const {
  signUp,
  signIn,
  showUser,
  indexProducts,
} = require("../controllers/publicController");
const { index } = require("../controllers/productController"); //this should be commented out

router.post("/sign-up", signUp);
router.post("/sign-in", signIn);
router.get("/products", index); // this should be commented out
router.get("/products", indexProducts);
router.post("/users/:userUsername", showUser);

module.exports = router;
