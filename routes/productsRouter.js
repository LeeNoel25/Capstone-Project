const express = require("express");
const router = express.Router();
const productsController = require("../controllers/productsController");
const { isAuth } = require("../controllers/auth");

router
  .get("/", productsController.index)
  .get("/:id", productsController.show)
  .post("/AdminProduct/new", isAuth, productsController.create)
  .delete("/productpage/:id", isAuth, productsController.delete)
  .put("/productpage/:id/edit", isAuth, productsController.update);

module.exports = router;
