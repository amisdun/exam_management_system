const mongoose = require("mongoose");

var staff_signup = mongoose.Schema({
    _id: mongoose.Schema.Types.ObjectId,
    staffName: {
        type: String,
        required: true
    },
    staffID: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: false
    }
})

var staff = mongoose.model("staff",staff_signup);

module.exports = staff;