const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken")
require("../../index");
const db = require("../db_connection/mongodb")

var admin = require("../Schemas/admin_signup");

var login = (req,res,next) => {
    admin.find({admin_name: req.body.admin_name})
    .exec()
    .then(results => {
        if(results.length < 1){
            res.json({
                message: "invalid username or password"
            })
        }
        else{
            bcrypt.compare(req.body.password, results[0].password, (err,valid)=>{
                if(err){
                    res.json({
                        message: "an error occured"
                    })
                }
                else if(valid === true){
                    var token =jwt.sign({
                        admin_name: results.admin_name,
                        userId: results._id
                    },
                    "dbkdbkqrjgrvgcwtkrnhrigukbqk",
                    {
                        expiresIn: "24h"
                    });
                    res.json({
                        message:  "Authentication succesfull",
                        token: token
                    })
                }
                else{
                    res.json({
                        message: "Authentication failed"
                    })
                }
            })
        }
    })
    .catch(err =>{
        res.json({
            error: "an error occured"
        })
    })
}

module.exports = {
    login: login
}