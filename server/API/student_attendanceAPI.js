const db = require("../db_connection/mongodb");
require("../../index");

var student_attendance = require("../Schemas/student_attendance");


var attendance = (req,res,next) => {
   
}

module.exports = {
    attendance: attendance
}