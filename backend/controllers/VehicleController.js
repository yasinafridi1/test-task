const { ErrorMessage, SuccessMessage } = require("../Utils/ResponseMessage");
const VehicleInfo = require("../models/VehicleInfo");

function vehicleController() {
  return {
    registerVehicle: async (req, res) => {
      try {
        console.log(req.body);
        const { model, price, phoneNumber, pictureCount } =
          req.body.vehicleInfo;
        if (!model || !price || !phoneNumber || !pictureCount) {
          return ErrorMessage(res, 422, "All fields are required");
        }

        if (pictureCount > 10) {
          return ErrorMessage(res, 422, "Maximum 10 images are allowd");
        }

        if (req.body.images.length <= 0) {
          return ErrorMessage(res, 422, "Please upload at least one image");
        }
        if (
          req.body.images.length > pictureCount ||
          req.body.images.length > 10
        ) {
          return ErrorMessage(res, 422, "Maximum 10 images are allowd");
        }

        const newVehicleInfo = new VehicleInfo({
          model,
          price,
          phoneNumber,
          pictureCount,
          userId: req.user._id,
          images: req.body.images,
        });

        const result = newVehicleInfo.save();
        if (!result) {
          return ErrorMessage(res);
        }
        return SuccessMessage(res, "Vehicle added successfully");
      } catch (error) {
        console.log(error);
        return ErrorMessage(res);
      }
    },
  };
}

module.exports = vehicleController;
