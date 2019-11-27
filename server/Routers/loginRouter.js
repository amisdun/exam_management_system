const express = require("express");
const router = express.Router();
require("../../index");

var signin = require("../API/loginAPI");

router.get("/signin",signin.login);