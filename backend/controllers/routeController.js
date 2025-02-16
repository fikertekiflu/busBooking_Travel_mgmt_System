const Route = require("../models/Route");

// Create Route
exports.createRoute = async (req, res) => {
  try {
    const { routeName, startingPoint, destination, distance } = req.body;
    const newRoute = new Route({ routeName, startingPoint, destination, distance });
    await newRoute.save();
    res.status(201).json({ message: "Route created successfully", route: newRoute });
  } catch (error) {
    res.status(500).json({ message: "Server error", error });
  }
};

// Get all Routes
exports.getAllRoutes = async (req, res) => {
  try {
    const routes = await Route.find();
    res.status(200).json(routes);
  } catch (error) {
    res.status(500).json({ message: "Server error", error });
  }
};

// Update Route
exports.updateRoute = async (req, res) => {
  try {
    const { routeName, startingPoint, destination, distance } = req.body;
    const updatedRoute = await Route.findByIdAndUpdate(req.params.id, { routeName, startingPoint, destination, distance }, { new: true });
    if (!updatedRoute) return res.status(404).json({ message: "Route not found" });
    res.status(200).json({ message: "Route updated successfully", route: updatedRoute });
  } catch (error) {
    res.status(500).json({ message: "Server error", error });
  }
};

// Delete Route
exports.deleteRoute = async (req, res) => {
  try {
    const deletedRoute = await Route.findByIdAndDelete(req.params.id);
    if (!deletedRoute) return res.status(404).json({ message: "Route not found" });
    res.status(200).json({ message: "Route deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: "Server error", error });
  }
};
