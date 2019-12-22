const express = require("express");
const router = express.Router();
require("../../index");

var staff_signin = require("../API/staff_loginAPI");

router.get("/signin",staff_signin.login);