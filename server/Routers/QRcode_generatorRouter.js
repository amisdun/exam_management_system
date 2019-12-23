const express = require("express");
const router = express.Router();
require("../../index");

var authenticate = require("../middlewares/webtoken_auth")

var generateQRcode = require("../API/QRcode_generatorAPI");

router.post("/student/generateQrcode",generateQRcode.generateQRcode)

module.exports = router;