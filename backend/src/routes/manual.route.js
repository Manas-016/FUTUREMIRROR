const express = require("express");
const { manualEntry } = require("../controllers/manual.controller");

const router = express.Router();

router.post("/manual", manualEntry);

module.exports = router;