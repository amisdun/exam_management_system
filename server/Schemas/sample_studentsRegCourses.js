const mongoose = require("mongoose");

var student_registered_courses = mongoose.Schema({
    academic_year: {
        type: String,
        required: true
    },
    index_number: {
        type: String,
        required: true
    },
    student_name: {
        type: String,
        required: true
    },
    program_name: {
        type: String,
        required: true
    },
    semester_type: {
        type: String,
        required: true
    },
    program_level: {
        type: String,
        required: true
    },
    registered_courses: {
        type: Array,
        required: false,
    }
})

var registered_courses = mongoose.model("registered_courses",student_registered_courses);

module.exports = registered_courses;