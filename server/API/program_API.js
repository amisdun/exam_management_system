const db = require("../db_connection/mongodb")
require("../../index")
const mongoose = require("mongoose")
const program_info = require("../Schemas/program_info")


let create_program = async (req,res,next) => {
    try {
        let available_program = await program_info.findOne({
            department_name: req.body.department_name, 
            program_name: req.body.program_name,
            level: req.body.level}).exec()
            if(available_program) return res.json({res: "program and level already exist"});
            else{
              await  new program_info({
                    _id: new mongoose.Types.ObjectId,
                    department_name: req.body.department_name,
                    level: req.body.level,
                    program_name: req.body.program_name,
                    number_of_student: req.body.number_of_student
                }).save()

                return res.json({res: "You have sucessfully created a new program and level"})
            }
    } catch (error) {
        console.log(error)
    }
}

let delete_program = async (req,res,next) => {
    try {
        await program_info.findByIdAndDelete({_id: req.params.id}).exec()

        return res.json({res: "deleted successfully"})
    } catch (error) {
        console.log(error)
    }
}

let edit_program = async (req,res,next) => {
    try {
        let edit_program = findOne({_id: req.params.id}).exec()
        if(edit_program) return res.json({res: "found", data: edit_program});
    } catch (error) {
        console.log(error)
    }
}

let update_program = async (req,res,next) => {
    try {
        await program_info.findByIdAndUpdate({_id: req.params.id}, {
        department_name: req.body.department_name, 
        level: req.body.level, 
        program_name: req.body.program_name, 
        number_of_student: req.body.number_of_student}).exec()

        return res.json({res: "saved successfuly"})
    } catch (error) {
        console.log(error)
    }
}

let get_programs = async (req,res,next) => {
    try {
        let all_program = await program_info.find({}).exec()
        if(all_program.length >= 1) return res.json({res: "found", data: all_program});
        else return res.json({res: "No data"})
    } catch (error) {
        console.log(error)
    }
}

let add_courses = async (req,res,next) => {
    try {
        await program_info.findOneAndUpdate({_id: req.body.id}, {"$push": {
            courses_offered: {
                _id: new mongoose.Types.ObjectId,
                course_name: req.body.course_name,
                examiner: req.body.examiner,
                course_code: req.body.course_code
            }
        }}).exec()

        return res.json({res: "new courses added"})
    } catch (error) {
        console.log(error)
    }
}

let delete_course = async (req,res,next) => {
    try {
        await program_info.findByIdAndDelete({_id: req.params.id}, {"$pull": {
            courses_offered: {
                _id: req.params.course_id
            }
        }})

        return res.json({res: "deleted"})
    } catch (error) {
        console.log(error)
    }
}

let edit_course = async (req,res,next) => {
    try {
        let edited_course = await program_info.findByOne({_id: req.params.id, "courses_offered._id": req.params.course_id}).exec()
        if(edited_course) return res.json({res: "found", data: edited_course})
    } catch (error) {
        console.log(error)
    }
}

let update_course = async (req,res,next) => {
    try {
        await program_info.findByOneAndUpdate({_id: req.params.id,"courses_offered._id": req.params.course_id},{"$set": {
            courses_offered: {
                course_name: req.body.course_name,
                examiner: req.body.examiner,
                course_code: req.body.course_code
            }
        }}).exec()

        return res.json({res: "updated", message: "course updated"})
    } catch (error) {
        console.log(error)
        return res.json({err: "An error has ouccred"})
    }
}

module.exports = {
    update_program,
    delete_program,
    create_program,
    get_programs,
    edit_program,
    edit_course,
    delete_course,
    add_courses,
    update_course
}