const express = require("express");
const router = express.Router();
require("../../index");

var staff_signup = require("../API/staff_siginup");

router.post("/staff_signup",staff_signup.register);
router.get("/all", staff_signup.get_staffs)

module.exports = router;
