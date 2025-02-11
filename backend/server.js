const express = require("express"); // Import Express
const dotenv = require("dotenv"); // Import dotenv for environment variables
const connectDB = require("./src/config/db"); // Import database connection function

dotenv.config(); // Load environment variables
connectDB(); // Connect to MongoDB

const app = express(); // Initialize Express app
app.use(express.json()); // Middleware to parse JSON requests

// Routes
app.use("/api/auth", require("./src/routes/authRoutes")); // Authentication routes

const PORT = process.env.PORT || 5000; // Use .env port or default to 5000
app.listen(PORT, () => console.log(`🚀 Server running on port ${PORT}`)); // Start the server
