const express = require("express");
const router = express.Router();
require("../../index");

const registered_course = require("../API/sample_studentsRegCoursesAPI")

router.get("/registered_courses", registered_course.students_courses)



module.exports = router;