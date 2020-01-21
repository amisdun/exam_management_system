const mongoose = require("mongoose");

var supervisor_schema = mongoose.Schema({
    _id: mongoose.Schema.Types.ObjectId,
    admin_name: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    email:{
        type: String,
        required: true
    },
})

var admin = mongoose.model("admin",supervisor_schema);

module.exports = admin;