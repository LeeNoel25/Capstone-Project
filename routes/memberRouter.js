const memberController = require("../controllers/memberController");
const express = require("express");
const router = express.Router();

router
  .get("/seed", memberController.seed)
  .post("/signup", memberController.create)
  .post("/login", memberController.login)
  .post("/reset", memberController.resetPassword);

module.exports = router;
