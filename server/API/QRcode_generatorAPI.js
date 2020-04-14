const db = require("../db_connection/mongodb");
const qrcode = require("qrcode");
const mongoose = require("mongoose");
mongoose.Promise = global.Promise;
const student_qrcode_info = require("../Schemas/QRcode_student_info");
require("../../index");

//API FOR GENERATING A QRCODE AND STORING THEM INTO THE DATABASE
var generateQRcode = (req,res) => {
    let student_name = req.body.student_name;
    //Getting academic year date
    var academic_year,i_length,i_slice,l_year,t_year,temp_year;
    let year = new Date().getUTCFullYear();
    let program_name = (req.body.program_name).toUpperCase();
    // Getting the semester and level from the index number
    var index_number = (req.body.index_number).toUpperCase();
    var level,semester;
    const defualt_month = 6;
    var month = new Date().getMonth() + 1;

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
            student_qrcode_info.findOne({academic_year: academic_year})
            .exec()
            .then(data => {
                if(data){
                    let qr_data = data.qrcode_value
                    let new_index;
                    qr_data.forEach(function(node){
                        if(node.index_number == index_number){
                            new_index = index_number
                        }
                        return new_index;
                    })
                    if(new_index == index_number){
                       return res.json({
                            res: "QR code image for this index number had already been created"
                        })
                    }
                    else{
                        student_qrcode_info.updateOne({academic_year: academic_year},{"$push": {
                            qrcode_value : {
                                        student_name: student_name,
                                        index_number: index_number,
                                        program_name: program_name,
                                        qrcodeImage: url
                                }
                        }},(err,val) => {
                            if(err) console.log(err)
                           return res.json({
                                res: `New student data with QRcode image saved succesfully for ${academic_year}`,
                                data: val
                            })
                        })
                    }
                }
                else{
                    new student_qrcode_info({
                        _id: new mongoose.Types.ObjectId,
                        academic_year: academic_year,
                            qrcode_value: [
                                {index_number: index_number,
                                program_name: program_name,
                                student_name: student_name,
                                qrcodeImage: url
                                }
                            ]
                    })
                    .save()
                    .then(data => {
                       return res.json({
                            res: `New data formed with academic year ${academic_year}`,
                            data: data
                        })
                    })
                    .catch(err => {
                       return res.json({
                            err: "An error occured",
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
          return  res.status(500).json({
                message: "Data url not created"
            })
        }
      })
}


let QRcode_info = async (req,res,next) => {
    let qrcode_info = await student_qrcode_info.find({}).exec()
    if(qrcode_info.length >= 1) return res.json({res: "found", data: qrcode_info})
}
// API TO MAKE QUERRY BY DATE
var searchByDate = (req,res,next) => {
    let academic_year = (req.query.academic_year).toUpperCase();
    student_qrcode_info.find({academic_year: academic_year})
    .exec()
    .then(result => {
        if(result.length >= 1){
           return res.status(200).json({
                res: "found",
                data: result
            })
        }
        else{
          return  res.json({
                record_res: `no records found for the academic year ${academic_year}`
            })
        }
    })
    .catch(err => {
      return res.status(500).json({
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

let delete_qrcode_info = async (req,res,next) => {
    try {
        await student_qrcode_info.findByIdAndUpdate(req.params.parent_id, {"$pull" : {
            qrcode_value: {
                _id: req.params.qrcode_id
            }
        }}).exec()
    
        return res.json({res: "deleted"})
    } catch (error) {
        console.log(error)
    }
}


module.exports =  {
    generateQRcode: generateQRcode,
    searchByDate: searchByDate,
    searchByIndexNum: searchByIndexNum,
    QRcode_info: QRcode_info,
    delete_qrcode_info: delete_qrcode_info
}