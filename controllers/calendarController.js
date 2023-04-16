const Groomer = require("../models/Groomer");
const Location = require('../models/Location');

const showAllLocation = async (req, res) => {
  try {
   
    const foundLocation = await Location.find({}).sort({type: 1}).exec();

    res.status(200).json(foundLocation);
  } catch (error) {
    console.log(`Error showing queueno: ${error}`);
    res.status(400).json({ error: error.message });
  }
};

const getGroomerByLocation = async (req, res) => {
  const locationId = req.params.id;
  try {
    const allGroomers = await Groomer.find({ "location.id": locationId })
    console.log(`allGroomers: ${allGroomers}`);
    res.status(200).json(allGroomers);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};


module.exports = {
  getGroomerByLocation,
  showAllLocation,
};
