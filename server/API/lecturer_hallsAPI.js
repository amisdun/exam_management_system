const db = require("../db_connection/mongodb")
const mongoose = require("mongoose")
let lecturer_hall = require("../Schemas/lecturer_halls")
require("../../index")
mongoose.Promise = global.Promise;

let add_lecturer_hall = async (req,res,next) => {
    try {
        let hall = await lecturer_hall.findOne({hall_name: req.body.hall_name}).exec()
        if(hall) return res.json({res: "exist", message: "lecturer hall already exist"});
        else{
            await new lecturer_hall({
                _id: new mongoose.Types.ObjectId,
                hall_name: req.body.hall_name,
                capacity: req.body.capacity
            }).save()

            return res.json({res: "created", message: "new lecturer hall added succefully"})
        }
    } catch (error) {
        console.log(error)
        return res.json({err: "an error has occured"})
    }
}

let update_hall = async (req,res,next) => {
    try {
        let id = req.params.id

        await lecturer_hall.findByIdAndUpdate(id, {hall_name: req.body.hall_name, capacity: req.body.capacity}).exec()

        return res.json({res: "updated", message: "success"})
    } catch (error) {
        return res.json({err: "an error has occured"})
    }
}

let delete_hall = async (req,res,next) => {
    try {
        let id = req.params.id

        await lecturer_hall.findByIdAndDelete(id).exec()

        return res.json({res: "deleted", message: "success"})
    } catch (error) {
        return res.json({err: "an error has occured"})
    }
}

let get_all_halls = async (req,res,next) => {
    try {
        let all_halls = await lecturer_hall.find({}).exec()

        if(all_halls) return res.json({res: "found", data: all_halls});
        else return res.json({res: "no data", message: "No halls available"});
    } catch (error) {
        return res.json({err: "an error has occured"})
    }
}

let get_one_hall = async (req,res,next) => {
    try {
        let id = req.params.id

        let hall = await lecturer_hall.findById(id).exec()
        if(hall) return res.json({res: "found", data: hall})
    } catch (error) {
        return res.json({err: "an error has occured"})
    }
}

module.exports = {
    add_lecturer_hall: add_lecturer_hall,
    update_hall: update_hall,
    delete_hall: delete_hall,
    get_all_halls: get_all_halls,
    get_one_hall: get_one_hall
}