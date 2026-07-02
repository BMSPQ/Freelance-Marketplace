const express = require("express");
const router = express.Router();

const verifyToken = require("../middleware/authMiddleware");
const authorizeRoles = require("../middleware/roleMiddleware");

const {
  getClientDashboard,
  getFreelancerDashboard,
} = require("../controllers/dashboardController");

// Client Dashboard
router.get(
  "/client",
  verifyToken,
  authorizeRoles("client"),
  getClientDashboard
);

// Freelancer Dashboard
router.get(
  "/freelancer",
  verifyToken,
  authorizeRoles("freelancer"),
  getFreelancerDashboard
);

module.exports = router;