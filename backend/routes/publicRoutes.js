const express = require("express");
const router = express.Router();
const { signUp, signIn } = require("../controllers/publicController");

router.post("/sign-up", signUp);
router.post("/sign-in", signIn);
router.post("/index", index);

module.exports = router;
