const express = require("express");
const router = express.Router();
const {
  show,
  showOwner,
  updateOwner,
  updateOwnerPassword,
} = require("../controllers/userController");

// specific routes
router.get("/owner", showOwner);
router.put("/owner", updateOwner); //would be great to use patch
router.put("/owner/password", updateOwnerPassword);

router.get("/:userUsername", show);

module.exports = router;
