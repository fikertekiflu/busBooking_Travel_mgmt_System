const Booking = require("../models/booking");
const Bus = require("../models/bus");
const Route = require("../models/Route");

// Create Booking (Passenger)
exports.createBooking = async (req, res) => {
  const { busId, routeId, seats, paymentInfo } = req.body;

  try {
    // Find the bus and route
    const bus = await Bus.findById(busId);
    const route = await Route.findById(routeId);

    if (!bus || !route) {
      return res.status(404).json({ message: "Bus or Route not found" });
    }

    if (seats > bus.availableSeats) {
      return res.status(400).json({ message: "Not enough available seats" });
    }

    // Create the booking
    const booking = new Booking({
      user: req.user.id,
      bus: busId,
      route: routeId,
      seats,
      paymentInfo,
    });

    // Save the booking
    await booking.save();

    // Update the available seats of the bus
    bus.availableSeats -= seats;
    await bus.save();

    res.status(201).json({ message: "Booking created successfully", booking });
  } catch (error) {
    res.status(500).json({ message: "Server error", error });
  }
};

// Get all bookings (Admin)
exports.getAllBookings = async (req, res) => {
  try {
    const bookings = await Booking.find().populate("user bus route");
    res.status(200).json(bookings);
  } catch (error) {
    res.status(500).json({ message: "Server error", error });
  }
};

// Get bookings by user (Passenger)
exports.getUserBookings = async (req, res) => {
  try {
    const bookings = await Booking.find({ user: req.user.id }).populate("bus route");
    res.status(200).json(bookings);
  } catch (error) {
    res.status(500).json({ message: "Server error", error });
  }
};

// Cancel Booking (Passenger)
exports.cancelBooking = async (req, res) => {
  try {
    const booking = await Booking.findById(req.params.id);

    if (!booking) {
      return res.status(404).json({ message: "Booking not found" });
    }

    // Only the user who created the booking can cancel it
    if (booking.user.toString() !== req.user.id) {
      return res.status(403).json({ message: "You can only cancel your own bookings" });
    }

    // Update the bus seats
    const bus = await Bus.findById(booking.bus);
    bus.availableSeats += booking.seats;
    await bus.save();

    // Cancel the booking
    booking.status = "canceled";
    await booking.save();

    res.status(200).json({ message: "Booking canceled successfully", booking });
  } catch (error) {
    res.status(500).json({ message: "Server error", error });
  }
};

// Confirm Booking (Admin)
exports.confirmBooking = async (req, res) => {
  try {
    const booking = await Booking.findById(req.params.id);

    if (!booking) {
      return res.status(404).json({ message: "Booking not found" });
    }

    // Only admin can confirm bookings
    if (req.user.role !== "admin") {
      return res.status(403).json({ message: "You are not authorized to confirm bookings" });
    }

    booking.status = "confirmed";
    await booking.save();

    res.status(200).json({ message: "Booking confirmed", booking });
  } catch (error) {
    res.status(500).json({ message: "Server error", error });
  }
};
