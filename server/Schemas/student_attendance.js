const mongoose = require("mongoose");

var student_attendance = mongoose.Schema({
    program_name: {
        type: String,
        required: true
    },
    course_name: {
        type: String,
        required: true
    },
    semester: {
        type: String,
        required: true
    },
    index_number: {
        type: String,
        required: true
    },
    level: {
        type: String,
        required: true
    },
    exam_year: {
        type: String,
        required: true
    },
    student_name: {
        type: String,
        required: true
    },
    student_signature: {
        type: String,
        required: false
    }
})

var attendance = mongoose.model("attendance",student_attendance);

module.exports = attendance;