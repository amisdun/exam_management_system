const db = require("../db_connection/mongodb");
require("../../index");
let fetch_registered_courses = require("../Schemas/sample_studentsRegCourses");
let student_attendance = require("../Schemas/student_attendance");
const mongoose = require("mongoose");
const { get } = require("../..");

let attendance = (req,res,next) => {
  let student_name = req.body.student_name;
  //Getting academic year date
  let academic_year,i_length,i_slice,l_year,t_year,temp_year;
  let year = new Date().getUTCFullYear();
  let program_name = req.body.program_name;

  // Getting the semester and level from the index number
  let index_number = (req.body.index_number)
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
// fetch_registered_courses.deleteMany({}).exec().then(() => {
//   return res.json("deleted")
// }).catch(err => {
//   console.log(err)
// })

fetch_registered_courses.find({}).exec().then(data => {
  console.log(data)
})
// let registered = new fetch_registered_courses({
//     _id: new mongoose.Types.ObjectId,
//     academic_year: academic_year,
//     index_number: index_number,
//     student_name: req.body.student_name,
//     program_name: program_name,
//     semester_type: semester,
//     program_level: level,
//     registered_courses: ['CENG308','CENG302','CENG206','CENG207']
//   })
//   .save()
//   .then(res => {
//     console.log(res)
//   })
//   .catch(error => {
//     console.log(error)
//   })
  student_attendance.findOne({exam_year: academic_year,semester: semester,course_name: req.body.course_code,index_number: req.body.index_number,level: level})
  .exec()
  .then(data => {
    if(data){
          res.status(422).json({
            res: "exist",
            msg: `Attendance for this course has been recorded for ${index_number}`
          })
      }
      else{
        let course_code = req.body.course_code;
        fetch_registered_courses.findOne({index_number: index_number})
        .exec()
        .then(data => {
          if(data){
              let registered_course = data.registered_courses;
              let confirmed_course;
              registered_course.forEach(function(courses){
                if(courses === course_code){
                    confirmed_course = courses
                    return confirmed_course
                  }
              })
                  if(confirmed_course != null){
                    console.log(confirmed_course)
                    let student_name = req.body.student_name;
                    let first_char = req.body.student_name.charAt(0);
                    let last_num = req.body.student_name.indexOf(" ") + 1;
                    let last_char = req.body.student_name.charAt(last_num)
                    let student_initials = `${first_char}.${last_char}`;
                    student_initials.toUpperCase();

                    new student_attendance({
                      _id: new mongoose.Types.ObjectId,
                      program_name: program_name,
                      course_name: course_code,
                      semester: semester,
                      index_number: index_number,
                      level: level,
                      exam_year: academic_year,
                      student_name: student_name,
                      student_signature: student_initials
                    })
                    .save()
                    .then(attendce => {
                      return res.status(200).json({
                        res: 'created',
                        msg: "Attendance recorded successfully",
                        attendce: attendce
                      })
                    })
                    .catch(err => {
                      console.log(err)
                    return res.status(500).json({
                        res: "An error occured"
                      })
                    })
                  }
                  else {
                    return res.status(422).json({res:"registration_error", msg: `${index_number} has not registered for ${course_code}`})
                  }
          } else {
            return res.status(422).json({res:"registration_error1", msg: `${index_number} has not registered for any courses`})
          }
        })
        .catch(err => {
          console.log(err)
          return res.status(500).json({
            res: "an error ocurred",
            err: err
          })
        })
      }

    })
    .catch(err => {
      console.log(err)
      return res.status(500).json({
        res: "an error has occured",
        err: err
      })
    })

  }

 let get_attendance_by_details = async (req,res,next) => {

  let { course_code, program_name, level } = req.body

  //Getting academic year date
  let academic_year,temp_year;
  let year = new Date().getUTCFullYear();

  // Getting the semester and level from the index number
  const defualt_month = 6;
  let month = new Date().getMonth() + 1;

  if(defualt_month > month){
    semester = "second semester";
    temp_year = year - 1;
    academic_year = `${temp_year}/${year}`;
  }
  else{
    semester = "first semester";
    temp_year = year + 1;
    academic_year = `${year}/${temp_year}`;
  }

  let get_attendance = await student_attendance.find({course_code: course_code, 
    program_name: program_name, 
    level: level,
    academic_year: academic_year,
    semester: semester
  }).exec()

  if(get_attendance.length > 0){
    return res.status(200).json({res: "found", data: get_attendance})
  }
  else return res.status(404).json({res: "no data", msg: "No data found"})
 }

  module.exports = {
    attendance: attendance,
    get_attendance_by_details: get_attendance_by_details
  }
