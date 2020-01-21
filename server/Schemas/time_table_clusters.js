const mongoose = require("mongoose")

var same_course = mongoose.Schema({
    _id: mongoose.Schema.Types.ObjectId,
    level: {
        type: String,
        required: true
    },
    course_name: {
        type: String,
        required: true
    },
    programs: [
        {
            type: String,
            required: true
        }
    ]
})

var S_cousres = mongoose.model("same_courses", same_course);

module.exports = S_cousres;