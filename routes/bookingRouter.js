const bookingController = require("../controllers/bookingController");
const { isAuth } = require("../controllers/auth");
const express = require("express");
const router = express.Router();

router
  .post("/:memberName/:date", isAuth, bookingController.createBooking)
  .delete("/:id", isAuth, bookingController.deleteBooking);

// router.post("/:memberName/:date", isAuth, bookingController.createBooking);
// router.delete("/:id", isAuth, bookingController.deleteBooking);

module.exports = router;
