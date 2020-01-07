const mongoose = require("mongoose");

var QRcode_info = mongoose.Schema({
    _id: mongoose.Schema.Types.ObjectId,
    academic_year:{
        type: String,
        required: true
    },
            qrcode_value: [
                {index_number: {
                    type: String,
                    required: true
                },
                student_name: {
                    type: String,
                    required: true
                },
                program_name: {
                    type: String,
                    required: true
                },
                qrcodeImage: {
                    type: String,
                    required: true
                }}
            ]
})

var students_qrcode_info = mongoose.model("students_qrcode_info",QRcode_info);

module.exports = students_qrcode_info;