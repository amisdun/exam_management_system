require("../../index");
const bcrypt = require("bcrypt");
const mongoose = require("mongoose");
const db = require("../db_connection/mongodb");

var admin = require("../Schemas/admin_signup");
var register = (req,res,next) => {
    admin.find({})
    .exec()
    .then(admins => {
        if(admins.length >= 1){
            var req_email = req.body.email;
            var req_name = req.body.admin_name;
            var new_email,new_name;
        admins.forEach(function(nodes){
            if(nodes.email == req_email || nodes.admin_name == req_name){
                new_email = req_email
                new_name = req_name
            }
            return {
                req_email,req_email
            }
        })
        if(new_email === req_email || new_name === req_name){
            res.status(409).json({
                message: "admin email or name is already in use",
                res: admins
            })
        }
        else{
            new_admin_signup()
        }
        }
        else{
             new_admin_signup()
        }
    })
    .catch(err => {
        console.log(err)
        res.status(500).json({
            error: "an error occured, try again",
        })
    })

    function new_admin_signup(){
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
};


module.exports = {
    register: register
}