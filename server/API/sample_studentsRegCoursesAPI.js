const db = require("../db_connection/mongodb");
require("../../index");

var registered_courses = require("../Schemas/sample_studentsRegCourses");

var students_courses = (req,res,next) => {
    new registered_courses({
        _id: new mongoose.Types.ObjectId,
        
    })
}

module.exports = {
    students_courses: students_courses
}