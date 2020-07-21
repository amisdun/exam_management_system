require("../../index");
const db = require("../db_connection/mongodb")
const university_courses = require("../Schemas/university_courses.js")
const mongoose = require("mongoose")


let fetch_all_university_courses = async (req,res,next) => {
  try {
    let all_courses = await university_courses.find({}).exec()

    if(all_courses.length >= 1) return res.status(200).json({res: "found", data: all_courses})
    else return res.status(404).json({res: "no courses", msg: "No courses found"})
  } catch (e) {
    console.log(e)
    return res.status(500).json({error: "an error has occured"})
  }
}

let create_course = async (req,res,next) => {
  let { course_name, course_code } = req.body
  try {
    let course = await university_courses.findOne({course_code: course_code.toUpperCase()}).exec()
    if(course) return res.status(422).json({res: "found", msg: "course already exist"})
    else {
      let create_course = new university_courses({
        _id: new mongoose.Types.ObjectId,
        course_name: course_name,
        course_code: course_code.toUpperCase()
      })

      if(create_course.save()) return res.status(201).json({res: "new course created"})
    }
  } catch (e) {
      console.log(e)
  }
}

module.exports = {
  fetch_all_university_courses: fetch_all_university_courses,
  create_course: create_course
}
