const mongoose = require("mongoose");

var program_info = mongoose.Schema({
    _id : mongoose.Schema.Types.ObjectId,
    departmant_name: {
        type: String,
        required: true
    },
    level: {
        type: Number,
        required: true
    },
    program_name: {
        type: String,
        required: true
    },
    number_of_student:{
        type: String,
        required: true
    },  
    courses_offered: [{
            course_name: {
                type: String,
                required: false
            },
            examinar: {
                type: String,
                required: false
            },
            course_code: {
                type: String,
                required: false
            }
    }]
});

var programs = mongoose.model("program_info",program_info);

module.exports = programs;