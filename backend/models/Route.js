const mongoose = require("mongoose");

const routeSchema = new mongoose.Schema({
  routeName: { type: String, required: true },
  startingPoint: { type: String, required: true },
  destination: { type: String, required: true },
  distance: { type: Number }, // optional: Distance between the points
}, { timestamps: true });

module.exports = mongoose.model("Route", routeSchema);
