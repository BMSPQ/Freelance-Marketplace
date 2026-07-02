const express = require("express");
const router = express.Router();

const verifyToken = require("../middleware/authMiddleware");
const authorizeRoles = require("../middleware/roleMiddleware");

const {
  placeBid,
  getProjectBids,
  acceptBid,
  getMyBids,
  rejectBid,
} = require("../controllers/bidController");

// =========================
// Freelancer Routes
// =========================

// Place Bid
router.post(
  "/:projectId",
  verifyToken,
  authorizeRoles("freelancer"),
  placeBid
);

// My Bids
router.get(
  "/my-bids",
  verifyToken,
  authorizeRoles("freelancer"),
  getMyBids
);

// =========================
// Client Routes
// =========================

// View Bids for Project
router.get(
  "/project/:projectId",
  verifyToken,
  authorizeRoles("client"),
  getProjectBids
);

// Accept Bid
router.put(
  "/accept/:bidId",
  verifyToken,
  authorizeRoles("client"),
  acceptBid
);

// Reject Bid
router.put(
  "/reject/:bidId",
  verifyToken,
  authorizeRoles("client"),
  rejectBid
);

module.exports = router;