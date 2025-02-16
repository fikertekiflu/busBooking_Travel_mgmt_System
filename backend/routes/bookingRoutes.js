const express = require("express");
const router = express.Router();
const { createBooking, getAllBookings, getUserBookings, cancelBooking, confirmBooking } = require("../controllers/bookingController");
const { authenticateUser, authorizeRole } = require("../middleware/authMiddleware");

// Create Booking (Passenger)
router.post("/bookings", authenticateUser, authorizeRole(["passenger"]), createBooking);

// Get All Bookings (Admin)
router.get("/bookings", authenticateUser, authorizeRole(["admin"]), getAllBookings);

// Get User's Bookings (Passenger)
router.get("/bookings/user", authenticateUser, authorizeRole(["passenger"]), getUserBookings);

// Cancel Booking (Passenger)
router.delete("/bookings/:id", authenticateUser, authorizeRole(["passenger"]), cancelBooking);

// Confirm Booking (Admin)
router.put("/bookings/confirm/:id", authenticateUser, authorizeRole(["admin"]), confirmBooking);

module.exports = router;
