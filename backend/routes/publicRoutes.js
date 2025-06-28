const express = require("express");
const router = express.Router();
const {
  signUp,
  signIn,
  showUser,
  indexProducts,
} = require("../controllers/publicController");

router.post("/sign-up", signUp);
router.post("/sign-in", signIn);
router.get("/products", indexProducts);
router.post("/users/:userUsername", showUser);

module.exports = router;
