const express = require("express");
const router = express.Router();
require("../../index");

var signin = require("../API/loginAPI");
var token = require("../middlewares/webtoken_auth")

router.get("/signin",token.authenticate,signin.login);