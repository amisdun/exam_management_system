require("../../index");
const bcrypt = require("bcrypt");
const mongoose = require("mongoose");
const db = require("../db_connection/mongodb");
var staff = require("../Schemas/staff_signup")

var register = (req,res,next) => {
    staff.find({})
    .exec()
    .then(staffs => {
        if(staffs.length >= 1){
            var req_name = req.body.staff_name;
            var req_email = req.body.email;

            staffs.forEach(function(staf){
                if(staf.staff_name === req_name || staf.email === req_email){
                    res.status(409).json({
                        message: "staff name or email already exist"
                    })
                }
                else{
                    bcrypt.hash(req.body.password, 10, (err,hash) =>{
                        if(err){
                            res.status(500).json({
                                error: "could not hash password"
                            })
                        }
                        else{
                             new staff({
                                _id: new mongoose.Types.ObjectId,
                                staffName: req.body.staff_name,
                                password: hash,
                                email: req.body.email,
                                staffID: req.body.staffID
                            })
                            .save()
                            .then(result => {
                                res.status(200).json({
                                    result: "staff account created successfuly",
                                    res: result
                                })
                            })
                            .catch(err =>{
                                console.log(err)
                                res.status(500).json({
                                    error: "account has not been created, an error has occured"
                                })
                            })
                        }
                    })
                }
            })
        }
        else{
            bcrypt.hash(req.body.password, 10, (err,hash) =>{
                if(err){
                    res.status(500).json({
                        error: "could not hash password"
                    })
                }
                else{
                     new staff({
                        _id: new mongoose.Types.ObjectId,
                        staffName: req.body.staff_name,
                        password: hash,
                        email: req.body.email,
                        staffID: req.body.staffID
                    })
                    .save()
                    .then(result => {
                        res.status(200).json({
                            result: "staff account created successfuly",
                            res: result
                        })
                    })
                    .catch(err =>{
                        console.log(err)
                        res.status(500).json({
                            error: "account has not been created, an error has occured"
                        })
                    })
                }
            })
        }
    })
    .catch(err => {
        console.log(err)
        res.status(500).json({
            error: "an error occured, try again"
        })
    })
};

module.exports = {
    register: register
}