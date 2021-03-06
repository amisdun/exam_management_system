const time_table = require("../API/exam_time_tableAPI")
const express = require("express")
const router = express.Router()
require("../../index")

router.post("/time_table", time_table.check_slot_flexibility, time_table.time_table_generator)
router.post("/search_by_academic_year", time_table.fetch_academic_sem_time_table)
router.put("/update_time_table/:id", time_table.find_by_id_and_update)
router.delete("/delete_time_table/:id", time_table.find_by_id_and_delete)
router.post("/student_time_table", time_table.fetch_student_time_table)
// router.get("/all_time_table", timetable.fetch_all_time_table)
module.exports = router
