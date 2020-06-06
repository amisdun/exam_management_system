const time_table = require("../API/exam_time_tableAPI")
const express = require("express")
const router = express.Router()
require("../../index")

router.get("/time_table", time_table.time_table)
router.get("/all_time_table", time_table.all_time_table)
module.exports = router