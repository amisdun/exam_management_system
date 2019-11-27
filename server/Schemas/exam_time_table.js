const mongoose = require("mongoose");

var timeTable_schema = mongoose.Schema({
    exam_date: {
        type: String,
        required: true
    },
    exam_time: {
        type: String,
        required: true
    },
    exam_venue: {
        type: String,
        required: true
    },
    course_name: {
        type: String,
        required: true
    },
    examiner: {
        type: String,
        required: true
    }
})

var time_table = mongoose.model("time_table",timeTable_schema);

module.exports = time_table;