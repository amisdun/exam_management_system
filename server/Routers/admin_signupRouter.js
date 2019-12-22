const express = require("express");
const router = express.Router();
require("../../index");

var signup = require("../API/admin_signupAPI");

router.post("/signin",signup.register);

module.exports = router;
