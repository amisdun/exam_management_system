const mongoose = require("mongoose");

var timeTable_schema = mongoose.Schema({
    exam_date: {
        type: String,
        required: true
    },
    exam_day: {
        type: String,
        required: true
    },
    exam_time: {
        type: String,
        required: true
    },
    program_name: {
        type: String,
        required: true
    },
    no_of_students: {
        type: Number, 
        required: true
    },
    examiner: {
        type: String,
        required: true
    },
    course_name: {
        type: String,
        required: true
    },
    level: {
        type: Number,
        required: true
    },
    lecture_halls: {
        type: Array,
        required: true
    },
    course_code: {
        type: String,
        required: true
    }
})

var time_table = mongoose.model("time_table",timeTable_schema);

module.exports = time_table;