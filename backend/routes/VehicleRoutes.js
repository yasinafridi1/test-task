const express = require("express");
const vehicleController = require("../controllers/VehicleController");
const auth = require("../middleware/auth");
const router = express.Router();

router.post("/register", auth, vehicleController().registerVehicle);

module.exports = router;
