const memberController = require("../controllers/memberController");
const express = require("express");
const router = express.Router();
const { isAuth } = require("../controllers/auth");

router
  .get("/seed", memberController.seed)
  // Favorites CRUD -------------------
  .get("/favorites/:memberId", isAuth, memberController.getFavorites)
  .post("/favorites/:memberId/:productId", isAuth, memberController.addFavorite)
  .delete(
    "/favorites/:memberId/:productId",
    isAuth,
    memberController.removeFavorite
  )
  // Member CRUD ----------------------
  .post("/signup", memberController.create)
  .post("/login", memberController.login)
  .post("/reset", memberController.resetPassword);

module.exports = router;
