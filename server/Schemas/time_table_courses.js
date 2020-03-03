const mongoose = require("mongoose")

let courses = mongoose.Schema({
    _id: mongoose.Schema.Types.ObjectId,
    course_name: {
        type: String,
        required: true
    },
    level: {
        type: String,
        required: true
    },
    program_name: {
        type: String,
        required: true
    },
    examiner: {
        type: String,
        required: true
    },
    number_of_students: {
        type: String,
        required: true
    },
    course_code: {
        type: String,
        required: true
    }
})

let all_courses = mongoose.model("course", courses)

module.exports = all_courses