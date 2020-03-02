const db = require("../db_connection/mongodb");
require("../../index");
let fetch_registered_courses = require("../Schemas/sample_studentsRegCourses");

let student_attendance = require("../Schemas/student_attendance");

let attendance = (req,res,next) => {
    let student_name = req.body.student_name;
    //Getting academic year date
    let academic_year,i_length,i_slice,l_year,t_year,temp_year;
    let year = new Date().getUTCFullYear();
    let program_name = req.body.program_name;

    // Getting the semester and level from the index number
    let index_number = (req.body.index_number).toUpperCase();
    let level,semester;
    const defualt_month = 6;
    let month = new Date().getMonth() + 1;

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
                let student_sig = node.student_signature;
                let new_index;
                if(node.semester === semester &&
                    node.program_name === program_name &&
                    node.level === level &&
                    node.index_number === index_number && 
                    student_sig.length >= 1){
                        new_index = index_number;
                    }
                    return new_index;
                
            })
            if(new_index == index_number){
                    res.json({
                        res: `Attendance for this index number has been recorded for ${academic_year} academic year`
                    })
            }
            else{
                take_new_attendance();
            }
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

let take_new_attendance = (req,res,next) => {
    let student_name = req.body.student_name;
    //Getting academic year date
    let academic_year,i_length,i_slice,l_year,t_year,temp_year;
    let year = new Date().getUTCFullYear();
    let program_name = req.body.program_name;

    // Getting the semester and level from the index number
    let index_number = (req.body.index_number).toUpperCase();
    let level,semester;
    const defualt_month = 6;
    let month = new Date().getMonth() + 1;

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
    let course_name = req.body.course_name;
    fetch_registered_courses.find({index_number: index_number})
            .exec()
            .then(data => {
                if(data.length >= 1){
                    data.forEach(function(x){
                        if(x.academic_year === academic_year && x.semester_type === semester){
                            return x;
                        }
                    })
                        let registered_course = x.registered_courses;
                        registered_course.forEach(function(courses){
                            if(courses === course_name){
                                let course = course_name;
                                let student_name = x.student_name;
                                let first_char = student_name.charAt(0);
                                let last_char = student_name.charAt(indexOf(" ") + 1);
                                let student_initials = `${first_char}.${last_char}`;
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