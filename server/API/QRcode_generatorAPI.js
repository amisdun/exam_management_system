const db = require("../db_connection/mongodb");
const qrcode = require("qrcode");
require("../../index");

var generateQRcode = (req,res) => {
    qrCode.toDataURL(req.body.qrcode_value, function (err, url) {
        console.log(url);
        if(url){
            res.json({
                url: url
            })
        }
        if(err){
            res.json({
                message: "Data url not created"
            })
        }
      })
}

module.exports = {
    generateQRcode: generateQRcode
}