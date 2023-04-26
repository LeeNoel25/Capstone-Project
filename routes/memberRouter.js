const memberController = require("../controllers/memberController");
const express = require("express");
const router = express.Router();

router
  .get("/seed", memberController.seed)
  .get("/favorites/:memberId", memberController.getFavorites)
  .post("/favorites/:memberId/:productId", memberController.addFavorite)
  .delete("/favorites/:memberId/:productId", memberController.removeFavorite)
  .post("/signup", memberController.create)
  .post("/login", memberController.login)
  .post("/reset", memberController.resetPassword);

  
module.exports = router;
