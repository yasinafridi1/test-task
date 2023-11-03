require("dotenv").config();
const express = require("express");
const port = process.env.PORT || 8000;
const app = express();
const mongoose = require("mongoose");
const cookieParser = require("cookie-parser");
const cors = require("cors");
const AuthRoutes = require("./routes/AuthRoutes");
const VehicleRoutes = require("./routes/VehicleRoutes");

app.use(
  cors({
    origin: "http://localhost:3000",
    credentials: true,
    methods: ["GET,POST"],
  })
);
app.use(cookieParser());
app.use(express.json());
app.use("/uploads", express.static("uploads"));

mongoose
  .connect(process.env.DB_URL, {
    useUnifiedTopology: true,
  })
  .then(() => {
    console.log("database connected");
  })
  .catch((err) => {
    console.log(err);
  });

app.use("/api/auth", AuthRoutes);
app.use("/api/vehicle", VehicleRoutes);

app.listen(port, () => {
  console.log(`Listening to port ${port}`);
});
