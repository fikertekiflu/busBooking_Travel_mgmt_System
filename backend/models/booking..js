const mongoose = require("mongoose");

const bookingSchema = new mongoose.Schema(
  {
    user: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true }, // Reference to the user who made the booking
    bus: { type: mongoose.Schema.Types.ObjectId, ref: "Bus", required: true }, // Reference to the bus
    route: { type: mongoose.Schema.Types.ObjectId, ref: "Route", required: true }, // Reference to the route
    seats: { type: Number, required: true }, // Number of seats booked
    status: { type: String, enum: ["pending", "confirmed", "canceled"], default: "pending" }, // Booking status
    paymentInfo: {
      amount: { type: Number, required: true }, // Total amount for the booking
      status: { type: String, enum: ["paid", "pending"], default: "pending" }, // Payment status
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Booking", bookingSchema);
