const express = require("express");
const router = express.Router();

const { getHomeData } = require("../controllers/homeController");

// Public Home Data
router.get("/", getHomeData);

module.exports = router;