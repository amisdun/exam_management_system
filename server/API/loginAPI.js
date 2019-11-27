const bcrypt = require("bcrypt");
require("../../index");
const db = require("../db_connection/mongodb")

var signup = require("../Schemas/signup");

var login = (req,res,next) => {

}

module.exports = {
    login: login
}