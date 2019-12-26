const db = require("../db_connection/mongodb");
require("../../index");
var fetch_registered_courses = require("../Schemas/sample_studentsRegCourses")

var student_attendance = require("../Schemas/student_attendance");


var attendance = (req,res,next) => {
    student_attendance.find({exam_year: req.body.exam_year})
    .exec()
    .then(data => {
        if(data.length >= 1){
            var index_number = req.body.index_number;
            data.forEach(function(node){
                var student_sig = node.student_signature;
                if(node.semester === req.body.semester_type &&
                    node.program_name === req.body.program_name &&
                    node.level === req.body.level
                    ){
                        if(node.index_number === index_number && student_sig.length >= 1){
                            res.json({
                                res: "Attendance for this index number has been recorded"
                            })
                        }
                    }
            })
        }
        else{
            var academic_year = req.body.academic_year;
            var semester_type = req.body.semester_type;
            var course_name = req.body.course_name;
            var index_number = req.body.index_number;
            fetch_registered_courses.find({index_number: index_number})
            .exec()
            .then(data => {
                if(data.length >= 1){
                    data.forEach(function(x){
                        if(x.academic_year === academic_year && x.semester_type === semester_type){
                            var registered_course = x.registered_courses;
                            registered_course.forEach(function(courses){
                                if(courses === course_name){
                                    var student_name = x.student_name;
                                    
                                }
                            })
                        }
                    })
                }
            })
            .catch(err => {
                res.status(500).json({
                    res: "an error ocurred",
                    err: err
                })
            })
        }
    })
    .catch(err => {
        res.status(500).json({
            res: "an error has occured",
            err: err
        })
    })
   
}

module.exports = {
    attendance: attendance
}