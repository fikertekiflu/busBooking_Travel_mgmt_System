const express = require("express");
const router = express.Router();
const busController = require("../controllers/busController");
const { authenticateUser, authorizeRole } = require("../middleware/authMiddleware");

router.post("/buses", authenticateUser, authorizeRole(["admin"]), busController.createBus); // Only Admins
router.get("/buses", authenticateUser, busController.getAllBuses); // Any logged-in user
router.get("/buses/:id", authenticateUser, busController.getBusById);
router.put("/buses/:id", authenticateUser, authorizeRole(["admin"]), busController.updateBus); // Only Admins
router.delete("/buses/:id", authenticateUser, authorizeRole(["admin"]), busController.deleteBus); // Only Admins
router.post("/buses/:id/book", authenticateUser, authorizeRole(["passenger"]), busController.bookSeat);
router.put("/buses/:id/update-availability", authenticateUser, authorizeRole(["driver"]), busController.updateAvailability);

module.exports = router;
