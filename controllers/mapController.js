const Location = require("../models/Location");

const showLocations = async (req, res) => {
  try {
    const locations = await Location.find({});
    res.json(locations);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Error retrieving locations from database.' });
  }
}


const enterLocations = async (req, res) =>{
    const {name, latitude, longitude} = req.body;

    try{
        const location = new Location({ name, latitude, longitude});
        await location.save();
        res.status(201).json(location);
    }

    catch(error){
        console.log(error);
        res.status(500).json({message: "server error"})
    }
}

const updateLocation = async (req, res) => {
  const { id } = req.params;
  const { name, latitude, longitude } = req.body;

  try {
    const updatedLocation = await Location.findByIdAndUpdate(
      id,
      { name, latitude, longitude },
      { new: true }
    );
    res.status(200).json(updatedLocation);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Error updating location' });
  }
};


module.exports = { 
    showLocations,
    enterLocations,
    updateLocation 
};