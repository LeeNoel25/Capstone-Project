const express = require("express");
const router = express.Router();
const productsController = require("../controllers/productsController");
const { isAuth } = require("../controllers/auth");

// Use the appropriate controller functions for each route
router
  .get("/", productsController.index) // Get all products
  .get("/:id", productsController.show) // Get a single product by ID

  // .get("/:id", productsController.showWithRatings) // Get a single product by ID
  // .get("/:id/with-ratings", productsController.showWithRatings) // Get a single product with ratings by ID
  .post("/:id/rating", isAuth, productsController.setRating) // Set a rating for a product
  .post("/:id/comment", isAuth, productsController.setComment) // Add a comment for a product

  .post("/AdminProduct/new", isAuth, productsController.create) // Create a new product (admin only)
  .delete("/productpage/:id", isAuth, productsController.delete) // Delete a product (admin only)
  .put("/productpage/:id/edit", isAuth, productsController.update); // Update a product (admin only)

module.exports = router;
