const express = require('express');
const router = express.Router();
const mapController = require('../controllers/mapController');


router.get('/', mapController.showLocations);
router.post('/',mapController.enterLocations)
router.put('/:id', mapController.updateLocation);


module.exports = router;