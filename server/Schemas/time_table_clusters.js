const mongoose = require("mongoose")

let same_course = mongoose.Schema({
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

let S_cousres = mongoose.model("same_courses", same_course);

module.exports = S_cousres;