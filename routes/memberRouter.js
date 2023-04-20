const memberController = require("../controllers/memberController");
const express = require("express");
const router = express.Router();

router
  .get("/seed", memberController.seed)
  .post("/signup", memberController.create)
  .post("/login", memberController.login)
  .post("/reset", memberController.resetPassword);

// router.post("/signup", memberController.create);
// router.post("/login", memberController.login);
// router.post("/reset", memberController.resetPassword);

module.exports = router;
