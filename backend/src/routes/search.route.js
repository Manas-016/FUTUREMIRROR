const express = require("express");
const { searchItem } = require("../controllers/search.controller");
const { authMiddleware } = require("../middlewares/auth.middleware");

const router = express.Router();

router.post("/search",authMiddleware, searchItem);

module.exports = router;