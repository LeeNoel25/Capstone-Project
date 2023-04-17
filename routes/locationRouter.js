const express = require("express");
const router = express.Router();
const locationController = require("../controllers/locationController");
const { isAuth } = require("../controllers/auth");

router
  .get("/:productName", locationController.findLocationByProductName)
  .get("/", isAuth, locationController.showLocation)
  .delete ("/:locationId/products/:productId", isAuth, locationController.deleteLocProduct)
  .put("/:locationId/products/:productId", isAuth, locationController.editLocProductQty)
  .get("/getlocation/:locationId", isAuth, locationController.showAddProduct)
  .post("/:locationId/", isAuth, locationController.addLocProduct)
  .delete("/products/:productID", isAuth, locationController.deleteProductFromBothCol)

// router.get("/:productName", locationController.  findLocationByProductName);
// router.get("/", isAuth, locationController.showLocation);
// router.delete("/:locationId/products/:productId",  isAuth,  locationController.deleteLocProduct);
// router.put("/:locationId/products/:productId",  isAuth,  locationController.editLocProductQty);
// router.get("/getlocation/:locationId", isAuth, locationController.showAddProduct);
// router.post("/:locationId/", isAuth, locationController.addLocProduct);
// router.delete("/products/:productID",  isAuth,  locationController.deleteProductFromBothCol);

module.exports = router;
