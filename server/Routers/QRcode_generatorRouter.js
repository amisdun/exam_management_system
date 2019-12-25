const express = require("express");
const router = express.Router();
require("../../index");

var authenticate = require("../middlewares/webtoken_auth")

var data = require("../API/QRcode_generatorAPI");

router.post("/generateQrcode",data.generateQRcode)
router.get("/searchByDate",data.searchByDate)
router.get("/searchByIndexNumber",data.searchByIndexNum)

module.exports = router;