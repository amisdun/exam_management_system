const express = require("express");
const router = express.Router();
require("../../index")

var attendance = require("../API/student_attendanceAPI")

router.post("/QRcode_atendance",attendance.attendance);
router.post("/search_attendance", attendance.get_attendance_by_details)

module.exports = router;