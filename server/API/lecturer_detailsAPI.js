const db = require("../db_connection/mongodb")
const mongoose = require("mongoose")
let lecturer_detail = require("../Schemas/lectures_details")
require("../../index")
mongoose.Promise = global.Promise;


// creating a new lecturer detail
let create_lecturer = async (req,res,next) => {
    try {
        let name = req.body.name;
        let lecturer = await lecturer_detail.findOne({name: name}).exec()
        console.log(lecturer)
        if(lecturer) res.status(200).json({res: "lecture already exist"})
        
        else {
            await new lecturer_detail({
                _id: new mongoose.Types.ObjectId,
                name: name
            }).save()
            res.status(201).json({res: "created"})
        }

    } catch (error) {
        console.log(error)
        res.status(500).json({err: "An error Ocurred"})
    }
}

// reading all lectures from the database
let read_lecturer_detail = async (req,res,next) => {
    try {
        let lecturer = await lecturer_detail.find({}).exec();

        if(lecturer.length >= 1) res.status(200).json({res: lecturer})
        res.json({res: "No data found"})

    } catch (error) {
        console.log(error)
        res.status(500).json({err: "An error has occured"})
    }
}

// reading single data from the database
let read_single = async (req,res,next) => {
    try {
        let single = await lecturer_detail.findById({_id: req.params.id}).exec()

        if(single) res.status(200).json({data: single,res: "found"})
        
        else {
            res.json({res: "not found"})
        }
    } catch (error) {
        console.log(error)
        res.status(500).json({err: "An error has ocured"})
    }
}

// deleting one lecturer at a time
let delete_one = async (req,res,next) => {
    try {
        await lecturer_detail.findByIdAndDelete(req.params.id).exec()
        res.json({res: "deleted"})

    } catch (error) {
        res.json({error: "An error ocurred"})
        console.log(error)
    }
    
}

// update lecturer ata a time
let update = async (req,res,next) => {
    try {
        let data = {
            name: req.body.name
        }
        let new_update = await (await lecturer_detail.findByIdAndUpdate(req.params.id,data)).save()
        console.log(new_update)
        if(new_update.isModified) res.json({res: "updated"})
    } catch (error) {
        res.json({err:"An error occured"})
        console.log(error)
    }
}


module.exports = {
    read_lecturer_detail: read_lecturer_detail,
    read_single: read_single,
    delete_one: delete_one,
    create_lecturer: create_lecturer,
    update: update
}