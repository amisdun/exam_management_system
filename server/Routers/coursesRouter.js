const express = require('express');
const router = express.Router();
require("../../index.js")
const university_courses = require("../API/university_coursesAPI.js")

router.get("/all_courses", university_courses.fetch_all_university_courses)
router.post("/create_course", university_courses.create_course)

module.exports = router
