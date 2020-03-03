const express = require("express");
const router = express.Router();
require("../../index");

var staff_login = require("../API/staff_loginAPI.js");

router.post("/signin",staff_login.staff_login);

module.exports = router;