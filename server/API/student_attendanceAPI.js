const db = require("../db_connection/mongodb");
require("../../index");
var fetch_registered_courses = require("../Schemas/sample_studentsRegCourses");

var student_attendance = require("../Schemas/student_attendance");

var attendance = (req,res,next) => {
    let student_name = req.body.student_name;
    //Getting academic year date
    var academic_year,i_length,i_slice,l_year,t_year,temp_year;
    let year = new Date().getUTCFullYear();
    let program_name = req.body.program_name;

    // Getting the semester and level from the index number
    var index_number = (req.body.index_number).toUpperCase();
    var level,semester;
    const defualt_month = 6;
    var month = new Date().toLocaleDateString().slice(0,2);

    if(defualt_month > month){
        semester = "second semester";
         temp_year = year - 1;
         academic_year = `${temp_year}/${year}`;
         i_length = (index_number.length) - 2;
         i_slice = index_number.slice(i_length,)
         l_year = academic_year.slice(7,)
         t_year = academic_year.slice(2,4);
        if(i_slice == t_year){
            level = 1+ "00"
        }
        else{
            level = (l_year - i_slice) + "00";
        }
    }
    else{
        semester = "first semester";
         temp_year = year + 1;
         academic_year = `${year}/${temp_year}`;
         i_length = (index_number.length) - 2;
         i_slice = index_number.slice(i_length,)
         l_year = academic_year.slice(7,)
         t_year = academic_year.slice(2,4);
        if(i_slice == t_year){
            level = 1+"00"
        }
        else{
            level = (l_year - i_slice) + "00";
        }
    }
    student_attendance.find({exam_year: academic_year})
    .exec()
    .then(data => {
        if(data.length >= 1){
            data.forEach(function(node){
                var student_sig = node.student_signature;
                if(node.semester === semester &&
                    node.program_name === program_name &&
                    node.level === level &&
                    node.index_number === index_number && 
                    student_sig.length >= 1
                    ){
                        res.json({
                            res: `Attendance for this index number has been recorded for ${academic_year} academic year`
                        })
                }
                else{
                    take_new_attendance();
                }
            })
        }
        else{
            take_new_attendance();
        }
    })
    .catch(err => {
        res.status(500).json({
            res: "an error has occured",
            err: err
        })
    })
   
}

var take_new_attendance = (req,res,next) => {
    let student_name = req.body.student_name;
    //Getting academic year date
    var academic_year,i_length,i_slice,l_year,t_year,temp_year;
    let year = new Date().getUTCFullYear();
    let program_name = req.body.program_name;

    // Getting the semester and level from the index number
    var index_number = (req.body.index_number).toUpperCase();
    var level,semester;
    const defualt_month = 6;
    var month = new Date().toLocaleDateString().slice(0,2);

    if(defualt_month > month){
        semester = "second semester";
         temp_year = year - 1;
         academic_year = `${temp_year}/${year}`;
         i_length = (index_number.length) - 2;
         i_slice = index_number.slice(i_length,)
         l_year = academic_year.slice(7,)
         t_year = academic_year.slice(2,4);
        if(i_slice == t_year){
            level = 1+ "00"
        }
        else{
            level = (l_year - i_slice) + "00";
        }
    }
    else{
        semester = "first semester";
         temp_year = year + 1;
         academic_year = `${year}/${temp_year}`;
         i_length = (index_number.length) - 2;
         i_slice = index_number.slice(i_length,)
         l_year = academic_year.slice(7,)
         t_year = academic_year.slice(2,4);
        if(i_slice == t_year){
            level = 1+"00"
        }
        else{
            level = (l_year - i_slice) + "00";
        }
    }
    var course_name = req.body.course_name;
    var index_number = req.body.index_number;
            fetch_registered_courses.find({index_number: index_number})
            .exec()
            .then(data => {
                if(data.length >= 1){
                    data.forEach(function(x){
                        if(x.academic_year === academic_year && x.semester_type === semester){
                            var registered_course = x.registered_courses;
                            registered_course.forEach(function(courses){
                                if(courses === course_name){
                                    var course = course_name;
                                    var student_name = x.student_name;
                                    var first_char = student_name.charAt(0);
                                    var last_char = student_name.charAt(indexOf(" ") + 1);
                                    var student_initials = `${first_char}.${last_char}`;
                                    student_initials.toUpperCase();

                                    new student_attendance({
                                        _id: new mongoose.Types.ObjectId,
                                        program_name: program_name,
                                        course_name: course,
                                        semester: semester,
                                        index_number: index_number,
                                        level: level,
                                        exam_year: academic_year,
                                        student_name: student_name,
                                        student_signature: student_initials
                                    })
                                    .save()
                                    .then(attendce => {
                                        res.status(200).json({
                                            res: "Attendance recorded successfully",
                                            attendce: attendce
                                        })
                                    })
                                    .catch(err => {
                                        res.status(500).json({
                                            res: "An error occured",
                                            err: err
                                        })
                                    })
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

module.exports = {
    attendance: attendance
}