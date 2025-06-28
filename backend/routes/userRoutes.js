const express = require("express");
const router = express.Router();
const {
  showOwner,
  updateOwner,

  updateOwnerPassword,
} = require("../controllers/userController");

// specific routes
router.get("/owner", showOwner);
router.put("/owner", updateOwner); //would be great to use patch
router.put("/owner/password", updateOwnerPassword);

// REMOVED due users shouldnt be able to get other Users' details
// router.get("/:userUsername", show);

module.exports = router;
