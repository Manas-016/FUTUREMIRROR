const express = require('express');
const { simulateImpact, getSimulationById } = require('../controllers/simulate.controller');
const { authMiddleware } = require('../middlewares/auth.middleware');

const router = express.Router();

router.post("/simulate", authMiddleware, simulateImpact);
router.get("/details/:id", authMiddleware, getSimulationById);

module.exports = router;