const express = require("express");

const router = express.Router();

const verifyToken = require("../middleware/authMiddleware");

const {
  getFreelancerProfile,
} = require("../controllers/userController");

router.get("/:id", verifyToken, getFreelancerProfile);

module.exports = router;