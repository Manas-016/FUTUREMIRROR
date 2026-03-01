const express = require("express");
const multer = require("multer");
const { scanImage } = require("../controllers/scan.controller");

const router = express.Router();

const upload = multer({ dest: "uploads/" });

router.post("/scan", upload.single("image"), scanImage);

module.exports = router;