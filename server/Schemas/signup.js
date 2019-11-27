const mongoose = require("mongoose");

var signup_schema = mongoose.Schema({
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

var signup = mongoose.model("signup",signup_schema);

module.exports = signup;