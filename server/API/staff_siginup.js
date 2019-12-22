require("../../index");
const db = require("../db_connection/mongodb");
var staff = require("../Schemas/signup")

var register = (req,res,next) => {
    staff.find({staff_name: req.body.staff_name})
    .exec()
    .then(staffs => {
        if(staffs.length >= 1){
            res.status(409).json({
                message: "staff name already exist"
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
                        staff_name: req.body.staff_name,
                        password: hash,
                        email: req.body.email,
                        staffID: req.body.staffID
                    })
                    .save()
                    .then(result => {
                        res.status(200).json({
                            result: "staff account created successfuly"
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