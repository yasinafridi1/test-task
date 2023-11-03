const mongoose = require("mongoose");

const vehicleInfoSchema = new mongoose.Schema({
  model: {
    type: String,
    required: true,
  },
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true, // User reference is required
  },
  price: {
    type: Number,
    required: true,
  },
  phoneNumber: {
    type: String,
    required: true,
  },
  pictureCount: {
    type: Number,
    required: true,
  },
  images: [], // Array of image paths
});

const VehicleInfo = mongoose.model("VehicleInfo", vehicleInfoSchema);

module.exports = VehicleInfo;
