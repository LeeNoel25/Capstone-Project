const express = require("express");
const router = express.Router();
const favoriteController = require("../controllers/favoriteController");
const { isAuth } = require("../controllers/auth");

router
  .get("/:memberId", isAuth, favoriteController.get)
  .post("/:memberId", isAuth, favoriteController.add)
  .delete("/:memberId", isAuth, favoriteController.delete);

module.exports = router;