const express = require("express");
const router = express.Router();
require("../../index");

var signup = require("../API/signupAPI");

router.post("/signin",signup.register);

module.exports = router;
