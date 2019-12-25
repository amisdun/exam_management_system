const express = require("express");
const router = express.Router();
require("../../index")

var attendance = require("../API/student_attendanceAPI")

router.post("/QRcode_atendance",attendance.attendance);

module.exports = router;