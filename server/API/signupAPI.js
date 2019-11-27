require("../../index");
const db = require("../db_connection/mongodb");

var signup = require("../Schemas/signup");

var register = (req,res,next) => {

};

module.exports = {
    register: register
}