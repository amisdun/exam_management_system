require("../../index");
var bcrypt = require("bcrypt");
const mongoose = require("mongoose");
const db = require("../db_connection/mongodb");

var admin = require("../Schemas/admin_signup");
var register = (req,res,next) => {
    admin.find({})
    .exec()
    .then(admins => {
        console.log(admins)
        if(admins.length >= 1){
            var req_email = req.body.email;
            var req_name = req.body.admin_name;
        admins.forEach(function(nodes){
            if(nodes.admin_name === req_name || nodes.email === req_email){
                res.status(409).json({
                    message: "admin name or email is already in use",
                    res: admins
                })
            }
            else{
                bcrypt.hash(req.body.password, 10, (err,hash) =>{
                    if(err){
                        console.log(err)
                        res.status(500).json({
                            error: "could not hash password"
                        })
                    }
                    else{
                         new admin({
                            _id: new mongoose.Types.ObjectId,
                            admin_name: req.body.admin_name,
                            password: hash,
                            email: req.body.email
                        })
                        .save()
                        .then(result => {
                            if(result){
                                res.status(200).json({
                                    result: "admin account created successfuly",
                                    res: result
                                })
                            }
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
                    console.log(err)
                    res.status(500).json({
                        error: "could not hash password"
                    })
                }
                else{
                     new admin({
                        _id: new mongoose.Types.ObjectId,
                        admin_name: req.body.admin_name,
                        password: hash,
                        email: req.body.email
                    })
                    .save()
                    .then(result => {
                        if(result){
                            res.status(200).json({
                                result: "admin account created successfuly",
                                res: result
                            })
                        }
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
            error: "an error occured, try again",
        })
    })
};

module.exports = {
    register: register
}