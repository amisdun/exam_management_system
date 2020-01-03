const db = require("../db_connection/mongodb");
const qrcode = require("qrcode");
const mongoose = require("mongoose");
mongoose.Promise = global.Promise;
var student_qrcode_info = require("../Schemas/QRcode_student_info");
require("../../index");

//API FOR GENERATING A QRCODE AND STORING THEM INTO THE DATABASE
var generateQRcode = (req,res) => {
    let student_name = req.body.student_name;
    //Getting academic year date
    var academic_year,i_length,i_slice,l_year,t_year,temp_year;
    let year = new Date().getUTCFullYear();
    let program_name = req.body.program_name;

    // Getting the semester and level from the index number
    var index_number = (req.body.index_number).toUpperCase();
    var level,semester;
    const defualt_month = 6;
    var month = new Date().toLocaleDateString().slice(0,2);

    if(defualt_month > month){
        semester = "second semester";
         temp_year = year - 1;
         academic_year = `${temp_year}/${year}`;
         i_length = (index_number.length) - 2;
         i_slice = index_number.slice(i_length,)
         l_year = academic_year.slice(7,)
         t_year = academic_year.slice(2,4);
        if(i_slice == t_year){
            level = 1+ "00"
        }
        else{
            level = (l_year - i_slice) + "00";
        }
    }
    else{
        semester = "first semester";
         temp_year = year + 1;
         academic_year = `${year}/${temp_year}`;
         i_length = (index_number.length) - 2;
         i_slice = index_number.slice(i_length,)
         l_year = academic_year.slice(7,)
         t_year = academic_year.slice(2,4);
        if(i_slice == t_year){
            level = 1+"00"
        }
        else{
            level = (l_year - i_slice) + "00";
        }
    }
    let data = JSON.stringify({
        student_name: student_name,
        index_number: index_number,
        program_name: program_name,
    })
    qrcode.toDataURL(data, function (err, url) {
        if(url){
            console.log(url)
            student_qrcode_info.find({academic_year: academic_year})
            .exec()
            .then(data => {
                if(data.length >= 1){
                    data.qrcode_info.qrcode_value.forEach(function(node){
                        if(node.index_number.length >= 1){
                            res.json({
                                res: "QR code image for this index number had already been created"
                            })
                        }
                        else{
                            student_qrcode_info.update({academic_year: academic_year},{"$push": {
                                qrcode_value: {
                                    "$each": [{
                                        student_name: student_name,
                                        index_number: index_number,
                                        program_name: program_name,
                                        qrcodeImage: url
                                    }]
                                }
                            }},(err,data) => {
                                if(err) throw err
                                res.json({
                                    res: `New student data with QRcode image saved succesfully for ${academic_year}`,
                                    data: data
                                })
                            })
                        }
                    })
                }
                else{
                    new student_qrcode_info({
                        _id: new mongoose.Types.ObjectId,
                        academic_year: academic_year,
                        qrcode_info: {
                            qrcode_value: [
                                {index_number: index_number,
                                program_name: program_name,
                                student_name: student_name,
                                qrcodeImage: url
                                }
                            ]
                        }
                    })
                    .save()
                    .then(data => {
                        res.json({
                            res: `New data formed with academic year ${academic_year}`,
                            data: data
                        })
                    })
                    .catch(err => {
                        res.json({
                            res: "An error occured",
                            err: err
                        })
                    })
                }
            })
            .catch(err => {
                console.log(err)
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
    let academic_year = (req.query.academic_year).toUpperCase();
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
    let index_number = (req.body.index_number).toUpperCase();
    student_qrcode_info.find({"qrcode_info.qrcode_value.index_number": index_number})
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