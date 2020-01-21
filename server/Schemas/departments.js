const mongoose = require("mongoose");

var departments = mongoose.Schema({
    _id: mongoose.Schema.Types.ObjectId,
    department_name: {
        type: String,
        required: true
    }
})

var department = mongoose.model("departments",departments);

module.exports = department;