const express = require("express");
const bodyParser = require("body-parser");
const path = require("path");
const cors = require("cors");
var jwt = require("jsonwebtoken");
var bcrypt = require("bcrypt");

var app = express();

// setting up the cross origin resource sharing
app.use(cors());

// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }))
// parse application/json
app.use(bodyParser.json())

// seriving static files
app.use(express.static("client"));

// requiring routers
var data = require("./server/Routers/QRcode_generatorRouter");
var admin_login = require("./server/Routers/admin_loginRouter");
var admin_signup = require("./server/Routers/admin_signupRouter");
var staff_login = require("./server/Routers/staff_loginRouter");
var staff_signup = require("./server/Routers/staff_signupRouter");
var attendance = require("./server/Routers/student_attendanceRouter")

// using the routers available
app.use("/admin",admin_login)
app.use("/admin",admin_signup)
app.use("/staff",staff_login)
app.use("/staff",staff_signup)
app.use("/student",data)
app.use("/student_attendance",attendance)

// specifing the development and production port
var port = process.env.PORT || 3000;

//serving the homepage to the client
app.get("/",(req,res) => {
    res.sendFile(path.join(__dirname + "/client/index.html"));
})

// server port listening
app.listen(port, () => {
    console.log(`server listening at port ${port}`);
});
module.exports = app;