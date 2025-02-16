const express = require("express");
const router = express.Router();
const { createRoute, getAllRoutes, updateRoute, deleteRoute } = require("../controllers/routeController");
const { authenticateUser, authorizeRole } = require("../middleware/authMiddleware");

router.post("/routes", authenticateUser, authorizeRole(["admin"]), createRoute);  // Only admin can create routes
router.get("/routes", getAllRoutes);  // Anyone can view routes
router.put("/routes/:id", authenticateUser, authorizeRole(["admin"]), updateRoute); // Admin can update routes
router.delete("/routes/:id", authenticateUser, authorizeRole(["admin"]), deleteRoute); // Admin can delete routes

module.exports = router;
