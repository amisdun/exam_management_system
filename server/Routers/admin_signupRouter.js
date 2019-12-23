const express = require("express");
const router = express.Router();
require("../../index");

var register = require("../API/admin_signupAPI");

router.post("/signup",register.register);

module.exports = router;
