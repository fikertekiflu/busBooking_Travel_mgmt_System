const mongoose = require("mongoose");

const busSchema = new mongoose.Schema({
  busNumber: { type: String, unique: true, required: true },
  totalSeats: { type: Number, required: true },
  availableSeats: { type: Number, required: true },
  driver: { type: mongoose.Schema.Types.ObjectId, ref: "User" }, // References User
  route: { type: mongoose.Schema.Types.ObjectId, ref: "Route" }, // References Route
}, { timestamps: true });
module.exports = mongoose.model("Bus", busSchema);
