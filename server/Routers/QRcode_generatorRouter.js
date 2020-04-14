const express = require("express");
const router = express.Router();
require("../../index");

var authenticate = require("../middlewares/webtoken_auth")

var data = require("../API/QRcode_generatorAPI");

router.post("/generateQrcode",data.generateQRcode)
router.get("/searchByDate",data.searchByDate)
router.get("/searchByIndexNumber",data.searchByIndexNum)
router.get("/all", data.QRcode_info)
router.delete("/delete_qrcode/:parent_id/:qrcode_id", data.delete_qrcode_info)

module.exports = router;