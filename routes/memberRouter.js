const memberController = require("../controllers/memberController");
const express = require("express");
const router = express.Router();

router.post("/signup", memberController.create);
router.post("/login", memberController.login);
router.post("/reset", memberController.resetPassword);

module.exports = router;
