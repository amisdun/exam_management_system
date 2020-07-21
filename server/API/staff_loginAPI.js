require("../../index");
const db = require("../db_connection/mongodb");
const staff =  require("../Schemas/staff_signup");


let staff_login = (req,res,next) => {
    staff.find({email: req.body.email})
    .exec()
    .then(results => {
        if(results.length < 1){
            res.json({
               res: "failed", message: "Invalid username or password"
            })
        }
        else{
            bcrypt.compare(req.body.password, results[0].password, (err,valid)=>{
                console.log(results.password);
                if(err){
                    res.json({
                        message: "an error occured"
                    })
                }
                else if(valid === true){
                    let token =jwt.sign({
                        email: results.email,
                        userId: results._id
                    },
                    "dbkdbkqrjgrvgcwtkrnhrigukbqk",
                    {
                        expiresIn: "24h"
                    });
                    res.json({
                        res: "success",
                        message:  "Authentication succesfull",
                        token: token
                    })
                }
                else{
                    res.json({
                        res: "failed", message: "Invalid username or password"
                    })
                }
            })
        }
    })
    .catch(err =>{
        res.json({error: "an error occured"})
    })
}

module.exports = {
    staff_login: staff_login
}
