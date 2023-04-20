const express = require("express");
const router = express.Router();
const productsController = require("../controllers/productsController");
const { isAuth } = require("../controllers/auth");

//refactored router code
router
  .get("/", productsController.index)
  .get("/:id", isAuth, productsController.show)
  .post("/AdminProduct/new", isAuth, productsController.create)
  .delete("/AdminProduct/:id", isAuth, productsController.delete)
  .put("/AdminProduct/:id/edit", isAuth, productsController.update);

// router.get("/", productsController.index);
// router.get("/:id", isAuth, productsController.show);
// router.post("/", isAuth, productsController.create);
// router.delete("/:id", isAuth, productsController.delete);
// router.put("/:id", isAuth, productsController.update);

// router.get("/seed", productsController.seed);
// router.post("/", isAuth(["Admin"]), productsController.create);
// router.delete("/:id", isAuth(["Admin"]), productsController.delete);
// router.put("/:id", isAuth(["Admin"]), productsController.update);

module.exports = router;
