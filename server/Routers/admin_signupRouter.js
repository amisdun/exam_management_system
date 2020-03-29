const express = require("express");
const router = express.Router();
require("../../index");

var register = require("../API/admin_signupAPI");

router.post("/admin_signup",register.register);
router.get("/all", register.get_admins)

module.exports = router;

