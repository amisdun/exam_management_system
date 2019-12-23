const express = require("express");
const router = express.Router();
require("../../index");

var staff_signup = require("../API/staff_siginup");

router.post("/signup",staff_signup.register);

module.exports = router;
