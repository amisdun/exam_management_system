const db = require("../db_connection/mongodb");
const time_table = require("../Schemas/exam_time_table")
require("../../index");

var time_table_generator = async (req,res,next) => {
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
        // checking for the hard constraints
        let all_schedules = await time_table.find({exam_date: req.body.exam_date, exam_day: req.body.exam_day, exam_time: req.body.exam_time}).exec()
        let schedules = await time_table.find({exam_day: req.body.exam_day, exam_time: req.body.exam_time}).exec()
        all_schedules.forEach(function(hall){
            hall.lecturer_hall.forEach(function(hall_name){
                if(hall_name === req.body.lecturer_hall){
                    halls = []
                    halls.push(hall_name)

                    return halls
                }
            })
        })
        let day_and_time = false
        schedules.forEach(function(day_time){
            if(day_time.exam_day === req.body.exam_day && day_time.exam_time === req.body.exam_time){
                day_and_time = true

                return day_and_time
            }
        })

        // checking for soft constraint conditions
        let program_course = await time_table.findOne({exam_date: req.body.exam_date,program_name: req.body.program_name, level: req.body.level}).exec()
        days.forEach(function(day){
            if(day.day === program_course.exam_day){
                let val = day.value

                return val
            }
        })

        days.forEach(function(y){
            if(y.day === req.body.exam_day){
                let n_val = y.value

                return n_val
            }
        })

        let flex_day = n_val - val;

        if(halls.length < 1 && day_and_time === true && flex_day > 1){
            new time_table({
                _id: new mongoose.Types.ObjectId,
                exam_date: req.body.exam_date,
                exam_day: req.body.exam_day,
                exam_time: req.body.exam_time,
                program_name: req.body.program_name,
                course_name: req.body.course_name,
                level: req.body.level,
                lecturer_hall: req.body.lecturer_hall,
                examiner: req.body.examiner,
                number_of_student: req.body.number_of_student
            }).save()

            return res.json({res: "Saved successfully"})
        }
        if(halls.length > 0){
            return res.json({res: "lecturer unavailable"})
        }
        if(day_and_time === false){
            return res.json({res: "time slot unavailable"})
        }

        
   }

}

module.exports = {
    time_table: time_table_generator
}