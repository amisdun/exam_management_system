const mongoose = require("mongoose")

const courses_schema = mongoose.Schema({
  _id: mongoose.Schema.Types.ObjectId,
  course_name: {
    type: String,
    required: true
  },
  course_code: {
    type: String,
    required: true
  }
})

let university_courses = mongoose.model("courses", courses_schema)

module.exports = university_courses
