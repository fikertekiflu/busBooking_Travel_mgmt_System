const Bus = require("../models/bus");

// 1️⃣ Create a new bus
exports.createBus = async (req, res) => {
  try {
    const bus = new Bus(req.body);
    await bus.save();
    res.status(201).json({ message: "Bus created successfully", bus });
  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message });
  }
};

// 2️⃣ Get all buses
exports.getAllBuses = async (req, res) => {
  try {
    const buses = await Bus.find();
    res.status(200).json(buses);
  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message });
  }
};

exports.getBusById = async (req, res) => {
  try {
    const bus = await Bus.findById(req.params.id);
    if (!bus) return res.status(404).json({ message: "Bus not found" });
    res.status(200).json(bus);
  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message });
  }
};

// 4️⃣ Update a bus
exports.updateBus = async (req, res) => {
  try {
    const updatedBus = await Bus.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!updatedBus) return res.status(404).json({ message: "Bus not found" });
    res.status(200).json({ message: "Bus updated successfully", updatedBus });
  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message });
  }
};

// 5️⃣ Delete a bus
exports.deleteBus = async (req, res) => {
  try {
    const deletedBus = await Bus.findByIdAndDelete(req.params.id);
    if (!deletedBus) return res.status(404).json({ message: "Bus not found" });
    res.status(200).json({ message: "Bus deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message });
  }
};
exports.bookSeat = async (req, res) => {
    try {
      const bus = await Bus.findById(req.params.id);
      if (!bus) return res.status(404).json({ message: "Bus not found" });
  
      if (bus.availableSeats <= 0) return res.status(400).json({ message: "No seats available" });
  
      bus.availableSeats -= 1; // Reduce available seats
      await bus.save();
  
      res.status(200).json({ message: "Seat booked successfully", bus });
    } catch (error) {
      res.status(500).json({ message: "Server error", error: error.message });
    }
  };
  exports.updateAvailability = async (req, res) => {
    try {
      if (req.user.role !== "driver") {
        return res.status(403).json({ message: "Forbidden: Only drivers can update availability" });
      }
  
      const bus = await Bus.findById(req.params.id);
      if (!bus) return res.status(404).json({ message: "Bus not found" });
  
      bus.availableSeats = req.body.availableSeats; // Update seats
      await bus.save();
  
      res.status(200).json({ message: "Availability updated successfully", bus });
    } catch (error) {
      res.status(500).json({ message: "Server error", error: error.message });
    }
  };
    
