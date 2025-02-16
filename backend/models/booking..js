const mongoose = require("mongoose");

const routeSchema = new mongoose.Schema({
  startLocation: { type: String, required: true },
  endLocation: { type: String, required: true },
  stops: [{ type: String }], // List of stops
  fare: { type: Number, required: true }
}, { timestamps: true });

module.exports = mongoose.model("Route", routeSchema);
