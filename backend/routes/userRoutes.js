const express = require("express");
const router = express.Router();
const { show } = require("../controllers/userController");

router.put("/profile", show);

module.exports = router;
