const express = require("express");
const router = express.Router();
const { getRecentSimulations } = require("../controllers/recentSimulation.controller");
const {authMiddleware} = require("../middlewares/auth.middleware");

router.get("/recent-simulations", authMiddleware, getRecentSimulations);

module.exports = router;