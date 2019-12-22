const jwt = require("jsonwebtoken");

var authenticate = (req,res,next) =>{
    jwt.verify(req.query.token, "dbkdbkqrjgrvgcwtkrnhrigukbqk",(err,decode)=>{
        if(err){
            res.json({
                message: "an error has occured",
                error: err
                
            })
        }
        req.user = decode;
        next();
    })
    
}

module.exports = authenticate;