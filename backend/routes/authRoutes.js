const express = require("express");
const router = express.Router();

const verifyToken = require("../middleware/authMiddleware");

const {
  registerUser,
  loginUser,
  getProfile,
  updateProfile,
} = require("../controllers/authController");

// =========================
// Authentication
// =========================

// Register
router.post("/register", registerUser);

// Login
router.post("/login", loginUser);

// Logged-in User Profile
router.get("/profile", verifyToken, getProfile);

// Update Profile
router.put("/profile", verifyToken, updateProfile);

module.exports = router;