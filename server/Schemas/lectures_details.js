const mongoose = require("mongoose")

let lecturer_datails = mongoose.Schema({
    _id: mongoose.Schema.Types.ObjectId,
    name: {
        type: String,
        required: true
    },
    course: [{
        course_code: {
            type: String,
            required: false
        }
    }]
})

let lecturer = mongoose.model("lecturer_detail",lecturer_datails);

module.exports = lecturer