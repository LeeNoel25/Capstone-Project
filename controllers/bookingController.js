const Booking = require("../models/Booking");
const moment = require("moment");

const createBooking = async (req, res) => {
  const { memberId } = req.params;
  const formattedDate = moment(req.params.date).format("DD/MM/YYYY");

  try {
    // Check if the user already has a booking on this date
    const countBooking = await Booking.countDocuments({
      "memberInfo.memberId": memberId,
      date: formattedDate,
    });

    if (countBooking >= 1) {
      return res.status(400).json({
        message: `You have already made a booking for ${formattedDate}.`,
      });
    }

    // Create a booking
    const createBooking = await Booking.create({ ...req.body, memberInfo: { memberId } });
    console.log(req.body);
    const newBooking = await createBooking.save();
    console.log(newBooking);
    res.status(200).json(newBooking);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

const deleteBooking = async (req, res) => {
  const { id } = req.params;
  console.log(id);
  try {
    const findBooking = await Booking.findOne({ _id: id });
    if (!findBooking) {
      return res.status(404).json({ error: "Booking not found" });
    }
    const deleteBooking = await Booking.deleteOne({
      _id: findBooking._id,
    });
    res.status(200).json(deleteBooking);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

module.exports = {
  createBooking,
  deleteBooking,
  //findBookingByDate
  //findBookingBymember
};




