const db = require("../db_connection/mongodb");
require("../../index");

var time_table = require("../Schemas/exam_time_table");

var time_table = (req,res,next) => {
   
}

module.exports = {
    time_table: time_table
}