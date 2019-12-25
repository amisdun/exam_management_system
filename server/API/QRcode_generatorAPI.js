const db = require("../db_connection/mongodb");
const qrcode = require("qrcode");
const mongoose = require("mongoose");
mongoose.Promise = global.Promise;
var student_qrcode_info = require("../Schemas/QRcode_student_info");
require("../../index");

//API FOR GENERATING A QRCODE AND STORING THEM INTO THE DATABASE
var generateQRcode = (req,res) => {
    var qrcode_value = (req.body.qrcode_value).toUpperCase();
    var academic_year = (req.body.academic_year).toUpperCase();
    qrcode.toDataURL(req.body.qrcode_value, function (err, url) {
        if(url){
            student_qrcode_info.find({"qrcode_info.qrcode_value": qrcode_value})
            .exec()
            .then(results => {
                if(results.length >= 1){
                    res.status(409).json({
                        message: "QRcode for this info has already been created"
                    })
                }
                else{
                    new student_qrcode_info({
                        _id: new mongoose.Types.ObjectId,
                        academic_year: academic_year,
                        "qrcode_info.qrcode_value": qrcode_value,
                        "qrcode_info.qrcodeImage": url
                    })
                    .save()
                    .then(result => {
                        res.status(200).json({
                            message: "students info succefully saved",
                            res: result
                        })
                    })
                    .catch(err => {
                        res.status(500).json({
                            err: "an error occured",
                            err1: err
                        })
                    })
                }
            })
        }
        if(err){
            res.status(500).json({
                message: "Data url not created"
            })
        }
      })
}

// API TO MAKE QUERRY BY DATE
var searchByDate = (req,res,next) => {
    var academic_year = (req.query.academic_year).toUpperCase();
    student_qrcode_info.find({academic_year: academic_year})
    .exec()
    .then(result => {
        if(result.length >= 1){
            res.status(200).json({
                res: result
            })
        }
        else{
            res.json({
                res: `no records found for the academic year ${academic_year}`
            })
        }
    })
    .catch(err => {
        res.status(500).json({
            err: "an error has occured",
            err1: err
        })
    })
}

// API TO MAKE QUERRY SEARCH BY INDEX NUMBER
var searchByIndexNum = (req,res,next) => {
    var qrcode_value = (req.query.qrcode_value).toUpperCase();
    student_qrcode_info.find({"qrcode_info.qrcode_value": qrcode_value})
    .exec()
    .then(result => {
        if(result.length >= 1){
            res.status(200).json({
                res: result
            })
        }
        else{
            res.json({
                res: `No search found for ${qrcode_value}`
            })
        }
    })
    .catch(err => {
        res.status(500).json({
            res: "an error has occured",
            err1: err
        })
    })
}


module.exports =  {
    generateQRcode: generateQRcode,
    searchByDate: searchByDate,
    searchByIndexNum: searchByIndexNum,
}