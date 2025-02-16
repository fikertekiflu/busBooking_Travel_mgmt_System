const jwt = require("jsonwebtoken");
const User = require("../models/user");

// Verify JWT Token
exports.authenticateUser = async (req, res, next) => {
  const token = req.header("Authorization")?.split(" ")[1]; // Get token from Authorization header

  if (!token) return res.status(401).json({ message: "Access Denied. No token provided." });

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    console.log("Decoded Token:", decoded); // Check the decoded token in the console for debugging

    // Ensure user ID is present in the token, then attach the user object to the request
    req.user = await User.findById(decoded.userId).select("-password");

    if (!req.user) {
      return res.status(404).json({ message: "User not found" });
    }

    next();
  } catch (error) {
    console.error(error);
    res.status(400).json({ message: "Invalid Token" });
  }
};

// Check if User has a Specific Role
exports.authorizeRole = (roles) => {
  return (req, res, next) => {
    if (!roles.includes(req.user.role)) {
      return res.status(403).json({ message: "Forbidden: You don't have access" });
    }
    next();
  };
};
