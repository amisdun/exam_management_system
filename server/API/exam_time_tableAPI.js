const db = require("../db_connection/mongodb");
const time_table = require("../Schemas/exam_time_table");
const courses = require("../Schemas/time_table_courses");
const program_and_courses = require("../Schemas/program_info");
const halls = require("../Schemas/lecturer_halls");
const mongoose = require("mongoose");
require("../../index");

// let time_table_generator = async (req, res, next) => {
// meeting the hard and soft constraints conditions
// let schedule = await time_table.find({
//     course_name: req.body.course_name,
//     prgram_name: req.body.program_name
// }).exec()
// if (schedule) {
//     return res.json({
//         res: "Course already added"
//     })
// } else {

//checking for the hard constraints
//         let halls = [];
//         let all_schedules = await time_table.find({
//             exam_date: req.body.exam_date,
//             exam_day: req.body.exam_day,
//             exam_time: req.body.exam_time}).exec()
//         all_schedules.forEach(function(hall){
//             (hall.lecturer_hall).forEach(function(hall_name){
//                 if(hall_name === req.body.lecturer_hall){
//                     halls.push(hall_name)

//                     return halls
//                 }
//             })
//         })
//         let day_and_time;
//         let schedules = await time_table.find({
//             exam_day: req.body.exam_day,
//             exam_time: req.body.exam_time}).exec()
//         schedules.forEach(function(day_time){
//             if(day_time.exam_day === req.body.exam_day && day_time.exam_time === req.body.exam_time && day_time.exam_date === req.body.exam_date){
//                 day_and_time = true
//             }
//             else{
//                 day_and_time = false
//             }
//             return day_and_time
//         })

//         if(halls.length < 1 && day_and_time === false){
//             let course = await courses.findOne({course_name: req.body.course_name, program_name: req.body.program_name}).exec()
//             if(course){
//                 new time_table({
//                     _id: new mongoose.Types.ObjectId,
//                     exam_date: req.body.exam_date,
//                     exam_day: req.body.exam_day,
//                     exam_time: req.body.exam_time,
//                     program_name: course.program_name,
//                     course_name: course.course_name,
//                     level: course.level,
//                     lecturer_hall: req.body.lecturer_hall,
//                     examiner: course.examiner,
//                     number_of_student: course.number_of_students,
//                     course_code: course.course_code
//                 }).save()

//                 await courses.findOneAndDelete({course_name: req.body.course_name, program_name: req.body.course_name}).exec()
//                 return res.json({res: "Saved successfully"})
//             }
//             else return res.json({res: "Course already have a slot"});
//         }
//         if(halls.length > 0){
//             return res.json({res: "hall(s) unavailable"})
//         }
//         if(day_and_time === true){
//             return res.json({res: "time slot unavailable"})
//         }
//         if(halls.length > 0 && day_and_time === true){
//             return res.json({res: "hall and time slot unavailable"})
//         }
//    }

// }

let time_table_generator = async (req, res, next) => {
  //await time_table.deleteMany({}).exec()
  //generating the timetable
  let programs = [];
  let courses = [];
  let time = ["morning", "afternoon"];
  let hall = [];

  let program_courses = await program_and_courses.find({}).exec();
  for (prog of program_courses) {
    programs.push(prog);
    for (course of prog.courses_offered) {
      courses.push(course);
    }
  }
  let hals = await halls.find({}).exec();
  for (hal of hals) {
    hall.push(hal);
  }
  let day = 1;
  let hall_count = 0;

  //fetching programs and courses

  let prog_random = programs[Math.floor(Math.random() * programs.length)];
  let course_random = courses[Math.floor(Math.random() * courses.length)];
  let time_random = time[Math.floor(Math.random() * time.length)];
  let hall_random = hall[Math.floor(Math.random() * hall.length)];
  let courses_offered = [];
  let allocated_halls = [];
  let found_course;
  let time_table_program = await program_and_courses
    .findById(prog_random._id)
    .exec();
  courses_offered = [...time_table_program.courses_offered];

  //checking for similar courses
  for (prog_cos of program_courses) {
    for (courses of prog_cos.courses_offered) {
      if (course_random.course_code === courses.course_code) {
        let time_table_courses = await time_table
          .findOne({
            exam_day: day,
            program_name: prog_random.program_name,
            level: prog_random.level,
          })
          .exec();

        console.log("time table courses", time_table_courses);
        if (time_table_courses === null) {
          let stored_courses = await time_table
            .findOne({
              course_code: course_random.course_code,
              level: prog_random.program_name,
            })
            .exec();

          console.log("stored course:", stored_courses);
          if (stored_courses === null) {
            if (hall_random.capacity >= prog_cos.number_of_student) {
              allocated_halls.push(hall_random.hall_name);
              console.log("allocated halls:", allocated_halls);
              console.log("..........");
              await new time_table({
                _id: new mongoose.Types.ObjectId(),
                exam_day: day,
                program_name: prog_random.program_name,
                exam_time: time_random,
                examiner: course_random.examinar,
                number_of_students: prog_random.number_of_student,
                course_name: course_random.course_name,
                course_code: course_random.course_code,
                lecture_halls: allocated_halls,
              }).save();

              console.log("save");
              return res.json({
                res: "saved",
              });
            } else if (hall_random.capacity < prog_cos.number_of_student) {
              hall.forEach(function (hal) {
                console.log(hal.hall_name);
                if (prog_random.number_of_student > hall_count) {
                  allocated_halls.push(hal.hall_name);
                  hall_count += hal.capacity;
                  console.log("allocated halls", allocated_halls);
                  console.log(prog_random.number_of_student);
                  console.log("hall count", hall_count);
                } else if (hall_count > prog_random.number_of_student) {
                  console.log("hall count", hall_count);
                  new time_table({
                    _id: new mongoose.Types.ObjectId(),
                    exam_day: day,
                    program_name: prog_random.program_name,
                    exam_time: time_random,
                    examiner: course_random.examinar,
                    number_of_students: prog_random.number_of_student,
                    course_name: course_random.course_name,
                    course_code: course_random.course_code,
                    lecture_halls: allocated_halls,
                  }).save();
                  console.log("saved");
                  return res.json({
                    res: "saved",
                  });
                }
              });
            }
          } else {
            let all_time_table = await time_table.find({}).exec();
            return res.json({
              data: all_time_table,
            });
          }
        } else {
          console.log("mmmmmmmm");

          return res.json({
            res: "hhhh",
          });
        }
      }
    }
  }

  // while (completed === false) {
  //     let final_time_table = await time_table.find({}).exec()
  //     if (courses.length === final_time_table.length) {

  //         completed = true

  //         return res.json({
  //             res: "completed",
  //             data: final_time_table
  //         })
  //     } else {

  //     }
  // }
  // for (prog_coz of program_courses) {
  //     for (courses of prog_coz.courses_offered) {

  //         if (course_random.course_code === courses.course_code) {
  //             let time_table_courses = await time_table.findOne({
  //                 exam_day: day,
  //                 program_name: prog_coz.program_name
  //             }).exec()

  //             console.log(time_table_courses)
  //             if (time_table_courses === null) {
  //                 console.log(course_random.course_code)
  //                 let stored_courses = await time_table.findOne({
  //                     course_code: course_random.course_code
  //                 }).exec()

  //                 console.log(stored_courses)
  //                 if (stored_courses === null) {
  //                     if (hall_random.capacity >= prog_random.number_of_student) {
  //                         allocated_halls.push(hall_random.hall_name)
  //                         new time_table({
  //                             _id: new mongoose.Types.ObjectId,
  //                             exam_day: day,
  //                             program_name: prog_random.program_name,
  //                             exam_time: time_random,
  //                             examiner: course_random.examinar,
  //                             number_of_students: prog_random.number_of_student,
  //                             course_name: course_random.course_name,
  //                             course_code: course_random.course_code,
  //                             lecture_halls: allocated_halls
  //                         }).save()
  //                     } else {
  //                         for (let h = 0; h < hall.length; h++) {
  //                             if (prog_random.number_of_student > hall_count) {
  //                                 allocated_halls.push(hall[h])
  //                                 hall_count += hall[h].capacity
  //                                 console.log(prog_random)
  //                                 console.log(prog_random.number_of_student)
  //                                 console.log(hall_cou)
  //                                 console.log(hall[h])nt

  //                                 console.log("not enough room")
  //                             } else if (hall_count >= prog_random.number_of_student) {
  //                                 console.log(hall_count)
  //                                 new time_table({
  //                                     _id: new mongoose.Types.ObjectId,
  //                                     exam_day: day,
  //                                     program_name: prog_random.program_name,
  //                                     exam_time: time_random,
  //                                     examiner: course_random.examinar,
  //                                     number_of_students: prog_random.number_of_student,
  //                                     course_name: course_random.course_name,
  //                                     course_code: course_random.course_code,
  //                                     lecture_halls: allocated_halls
  //                                 }).save()
  //                                 day += 1
  //                             }

  //                         }
  //                     }
  //                 }
  //             }
  //         } else {
  //             for (let c = 0; c < courses_offered.length; c++) {
  //                 if (course_random._id === courses_offered[c]._id) {
  //                     found_course = courses_offered[c]
  //                     if (found_course) {
  //                         let time_table_courses = await time_table.findOne({
  //                             exam_day: day,
  //                             program_name: prog_random.program_name
  //                         }).exec()
  //                         if (time_table_courses === null) {
  //                             let stored_courses = await time_table.findOne({
  //                                 course_code: found_course.course_code
  //                             }).exec()

  //                             if (stored_courses === null) {
  //                                 if (hall_random.capacity >= prog_random.number_of_student) {
  //                                     allocated_halls.push(hall_random.hall_name)
  //                                 } else {
  //                                     for (let h = 0; h < hall.length; h++) {
  //                                         if (prog_random.number_of_student > hall_count) {
  //                                             allocated_halls.push(hall[h])
  //                                             hall_count += hall[h].capacity
  //                                         }
  //                                         if (hall_count >= prog_random.number_of_student) {

  //                                             new time_table({
  //                                                 _id: new mongoose.Types.ObjectId,
  //                                                 exam_day: day,
  //                                                 program_name: prog_random.program_name,
  //                                                 exam_time: time_random,
  //                                                 examiner: found_course.examiner,
  //                                                 number_of_students: prog_random.number_of_student,
  //                                                 course_name: found_course.course_name,
  //                                                 course_code: found_course.course_code,
  //                                                 lecture_halls: allocated_halls
  //                                             }).save()
  //                                             day += 1
  //                                         }

  //                                     }
  //                                 }
  //                             }
  //                         }
  //                     } else {
  //                         course_random = courses[Math.floor(Math.random() * courses.length)]
  //                     }
  //                 }
  //             }
  //         }
  //     }
  // }

  // let all_time_table = await time_table.find({}).exec()

  // return res.json({
  //     data: all_time_table
  // })
};

let check_slot_flexibility = async (req, res, next) => {
  let flexibilty = req.body.flexibilty;

  // checking for soft constraint conditions
  let days = [
    {
      day: "monday",
      value: 1,
    },
    {
      day: "tuesday",
      value: 2,
    },
    {
      day: "wednesday",
      value: 3,
    },
    {
      day: "thursday",
      value: 4,
    },
    {
      day: "friday",
      value: 5,
    },
  ];
  let program_course = await time_table
    .findOne({
      exam_date: req.body.exam_date,
      program_name: req.body.program_name,
      level: req.body.level,
    })
    .exec();
  days.forEach(function (day) {
    if (day.day === program_course.exam_day) {
      val = day.value;

      return val;
    }
  });
  days.forEach(function (y) {
    if (y.day === req.body.exam_day) {
      n_val = y.value;

      return n_val;
    }
  });

  let flex_day = n_val - val;

  if (flex_day <= 1) {
    if (flexibilty == null || flexibilty == "" || flexibilty == undefined) {
      return res.json({
        res: "No flexibility",
        msg: "No flexibility for this program, do you want to continue?",
      });
    } else {
      next();
    }
  } else {
    next();
  }
};

let fetch_all_time_table = async (req, res, next) => {
  let all_time_table = await time_table.find({}).exec();

  return res.json({
    data: all_time_table,
  });
};

module.exports = {
  time_table: time_table_generator,
  check_slot_flexibility: check_slot_flexibility,
  all_time_table: fetch_all_time_table,
};
