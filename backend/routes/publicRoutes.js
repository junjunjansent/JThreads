const express = require("express");
const router = express.Router();
const { signUp } = require("../controllers/publicController");

router.post("/sign-up", signUp);
// router.post("/sign-in", signIn);

module.exports = router;
