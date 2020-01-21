const mongoose = require("mongoose");

var program_info = mongoose.Schema({
    _id : mongoose.Schema.Types.ObjectId,
    departmant_name: {
        type: String,
        required: true
    },
    program: [{
        program_name: {
            type: String,
            required: true
        },
        level: {
            type: Number,
            required: true
        },
        number_of_student:{
            type: String,
            required: true
        },
        courses_offered: [{
            course_name: {
                type: String,
                required: true
            },
            examinar: {
                type: String,
                required: true
            }
        }]
    }],
});

var programs = mongoose.model("program_info",program_info);

module.exports = programs;