const db = require("../db_connection/mongodb");
require("../../index");

var registered_courses = require("../Schemas/sample_studentsRegCourses");

var students_courses = (req,res,next) => {
    registered_courses.find({})
    .exec()
    .then(courses => {
        if(courses.length >= 1){
            res.status(200).json({
                result: courses
            })
        }
        else{
            res.json({
                res: "No data found"
            })
        }
        return courses;
    })
    .catch(err => {
        res.status(500).json({
            err: "An error has occured",
            err1: err
        })
    })
   
}

module.exports = {
    students_courses: students_courses
}