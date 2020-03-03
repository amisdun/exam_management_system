const db = require("../db_connection/mongodb");
const time_table = require("../Schemas/exam_time_table")
const courses = require("../Schemas/time_table_courses")
require("../../index");

let time_table_generator = async (req,res,next) => {
   // meeting the hard and soft constraints conditions
   let schedule = await time_table.find({course_name: req.body.course_name}).exec()
   if(schedule){
       return res.json({res: "Course already added"})
   }
   else {
       let days = [{day: "monday",value: 1},
                   {day: "tuesday" ,value: 2},
                   {day: "wednesday", value: 3},
                   {day: "thursday", value: 4},
                   {day: "friday", value: 5}
                  ]
        //checking for the hard constraints
        let halls = [];
        let all_schedules = await time_table.find({
            exam_date: req.body.exam_date, 
            exam_day: req.body.exam_day, 
            exam_time: req.body.exam_time}).exec()
        let schedules = await time_table.find({
            exam_day: req.body.exam_day, 
            exam_time: req.body.exam_time}).exec()
        all_schedules.forEach(function(hall){
            hall.lecturer_hall.forEach(function(hall_name){
                if(hall_name === req.body.lecturer_hall){
                    halls.push(hall_name)

                    return halls
                }
            })
        })
        let day_and_time;
        schedules.forEach(function(day_time){
            if(day_time.exam_day === req.body.exam_day && day_time.exam_time === req.body.exam_time && day_time.exam_date === req.body.exam_date){
                day_and_time = true
            }
            else{
                day_and_time = false
            }
            return day_and_time
        })

        

        if(halls.length < 1 && day_and_time === false){
            let course = await courses.findOne({course_name: req.body.course_name, program_name: req.body.program_name}).exec()
            if(course){
                new time_table({
                    _id: new mongoose.Types.ObjectId,
                    exam_date: req.body.exam_date,
                    exam_day: req.body.exam_day,
                    exam_time: req.body.exam_time,
                    program_name: course.program_name,
                    course_name: course.course_name,
                    level: course.level,
                    lecturer_hall: req.body.lecturer_hall,
                    examiner: course.examiner,
                    number_of_student: course.number_of_students,
                    course_code: course.course_code
                }).save()

                await courses.findOneAndDelete({course_name: req.body.course_name, program_name: req.body.course_name}).exec()
                return res.json({res: "Saved successfully"})
            }
            else return res.json({res: "Course already have a slot"});
        }
        if(halls.length > 0){
            return res.json({res: "hall unavailable"})
        }
        if(day_and_time === true){
            return res.json({res: "time slot unavailable"})
        }
        if(halls.length > 0 && day_and_time === true){
            return res.json({res: "hall and time slot unavailable"})
        }
   }

}

let check_slot_flexibility = async (req,res,next) => {
    let flexibilty = req.body.flexibilty

    // checking for soft constraint conditions
    let program_course = await time_table.findOne({
        exam_date: req.body.exam_date,
        program_name: req.body.program_name, 
        level: req.body.level}).exec()
    days.forEach(function(day){
        if(day.day === program_course.exam_day){
            val = day.value

            return val
        }
    })
    days.forEach(function(y){
        if(y.day === req.body.exam_day){
            n_val = y.value

            return n_val
        }
    })

    let flex_day = n_val - val;

    if(flex_day <= 1){
        if(flexibilty == null || flexibilty == "" || flexibilty == undefined){
            return res.json({res: "No flexibility", msg: "No flexibility for this program, do you want to continue?"})
        }
        else{

            next()
        }
    }
    else{

        next()
    }
}

module.exports = {
    time_table: time_table_generator,
    check_slot_flexibility: check_slot_flexibility
}