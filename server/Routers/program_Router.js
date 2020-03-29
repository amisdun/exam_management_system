const express = require("express")
const router = express.Router()
require("../../index")
const program_info = require("../API/program_API")

// CRUD ACTIONS ON PROGRAM AND DEPARTMENT

router.get("/all_programs", program_info.get_programs)
router.post("/create_program", program_info.create_program)
router.delete("/delete_program/:id", program_info.delete_program)
router.patch("/update_program/:id", program_info.update_program)
router.get("/edit_program/:id", program_info.edit_program)

// CRUD ACTIONS ON COURSES

router.get("/edit_course/:id/:course_id", program_info.edit_course)
router.post("/add_course/:id", program_info.add_courses)
router.patch("/update_course/:id/:course_id", program_info.update_course)
router.delete("/delete_course/:id/:course_id", program_info.delete_course)

module.exports = router