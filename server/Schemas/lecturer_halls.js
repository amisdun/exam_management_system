const mongoose = require("mongoose")

let lecturer_hall = mongoose.Schema({
    _id: mongoose.Schema.Types.ObjectId,
    hall_name: {
        type: String,
        required: true
    },
    capacity: {
        type: Number,
        required: true
    }
})

let halls = mongoose.model("halls", lecturer_hall)

module.exports = halls