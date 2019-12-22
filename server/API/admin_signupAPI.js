require("../../index");
const db = require("../db_connection/mongodb");

var admin = require("../Schemas/admin");

var register = (req,res,next) => {
    admin.find({admin_name: req.body.admin_name})
    .exec()
    .then(admins => {
        if(admins.length >= 1){
            res.status(409).json({
                message: "admin name already exist"
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
                     new admin({
                        _id: new mongoose.Types.ObjectId,
                        admin_name: req.body.username,
                        password: hash,
                        email: req.body.email
                    })
                    .save()
                    .then(result => {
                        res.status(200).json({
                            result: "admin account created successfuly"
                        })
                    })
                    .catch(err =>{
                        res.status(500).json({
                            error: "account has not been created, an error has occured"
                        })
                    })
                }
            })
        }
    })
    .catch(err => {
        res.status(500).json({
            error: "an error occured, try again"
        })
    })
};

module.exports = {
    register: register
}