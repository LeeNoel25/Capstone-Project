const Booking = require("../models/Booking");
const Groomer = require("../models/Groomer");
const moment = require("moment");

const createGroomer = async (req, res) => {
  try {
    const createGroomer = await Groomer.create(req.body);
    console.log(req.body);
    const newGroomer = await createGroomer.save();
    console.log(newGroomer);
    res.status(200).json(newGroomer);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

const deleteGroomer = async (req, res) => {
  const { id } = req.params;
  console.log(id);

  try {
    await Booking.deleteMany({ "groomer.id": id });

    // Find and delete the groomer
    const findGroomer = await Groomer.findByIdAndDelete(id);

    if (!findGroomer) {
      return res.status(404).json({ error: "Groomer not found" });
    }

    res.status(200).json({ message: "Groomer deleted successfully" });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

const updateGroomer = async (req, res) => {
  const { groomerId } = req.params;

  try {
    const groomerBody = req.body;
    const groomer = await Groomer.findOneAndUpdate(
      { _id: groomerId },
      groomerBody,
      { new: true }
    );
    res.status(200).json(groomer);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

const groomerBooking = async (req, res) => {
  try {
    const { groomer } = req.params;
    const currentDate = moment().startOf("day").format("DD/MM/YYYY");

    const getBooking = await Booking.find({
      "groomer.id": groomerId,
      date: {
        $gte: currentDate,
      },
    })
      .sort({ date: 1 })
      .populate("location.id groomer.id")
      .sort({ date: 1, timeslot: 1 });

    res.status(200).json(getBooking);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

const showGroomers = async (req, res) => {
  const { id } = req.params;

  try {
    const groomer = await Groomer.findById(id).populate("location.id");
    res.status(200).json(groomer);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

const findGroomerByLocation = async (req, res) => {
  try {
    const { locationId } = req.params;
    const targetLocation = await Groomer.find({
      "location.id": locationId,
    }).populate("location.id");
    res.status(200).json(targetLocation);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

module.exports = {
  createGroomer,
  deleteGroomer,
  updateGroomer,
  groomerBooking,
  showGroomers,
  findGroomerByLocation,
};
