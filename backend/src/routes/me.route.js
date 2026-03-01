const express = require('express');
const { userMeController } = require('../controllers/me.controller');
const {authMiddleware} = require('../middlewares/auth.middleware');

const router = express.Router();

router.get('/me', authMiddleware, userMeController);

module.exports = router;