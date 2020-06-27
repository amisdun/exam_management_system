const time_table = require("../API/exam_time_tableAPI")
const express = require("express")
const router = express.Router()
require("../../index")

router.post("/time_table", time_table.check_slot_flexibility, time_table.time_table_generator)
module.exports = router