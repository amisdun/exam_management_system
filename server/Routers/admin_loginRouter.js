const express = require("express");
const router = express.Router();
require("../../index");

var login = require("../API/admin_loginAPI");

router.post("/signin",login.login);

module.exports = router;