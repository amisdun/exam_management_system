const express = require("express");
const bodyParser = require("body-parser");
const path = require("path");
const cors = require("cors");
let jwt = require("jsonwebtoken");
let bcrypt = require("bcrypt");

let app = express();

// setting up the cross origin resource sharing
app.use(cors());

// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }))
// parse application/json
app.use(bodyParser.json())

// seriving static files
app.use(express.static(__dirname + "/client"));

// requiring routers
let data = require("./server/Routers/QRcode_generatorRouter");
let admin_login = require("./server/Routers/admin_loginRouter");
let admin_signup = require("./server/Routers/admin_signupRouter");
let staff_login = require("./server/Routers/staff_loginRouter");
let staff_signup = require("./server/Routers/staff_signupRouter");
let attendance = require("./server/Routers/student_attendanceRouter")
let lecturer_details = require("./server/Routers/lecturer_detailRouter")
let time_table = require("./server/Routers/time_tableRouter")
let program_info = require("./server/Routers/program_Router")
let QRcode = require("./server/Routers/QRcode_generatorRouter")

// using the routers available
app.use("/admin",admin_login)
app.use("/admin",admin_signup)
app.use("/staff",staff_login)
app.use("/staff",staff_signup)
app.use("/student",data)
app.use("/student_attendance",attendance)
app.use("/lecturer_detail",lecturer_details)
app.use("/student", time_table)
app.use("/program", program_info)
app.use("/QRcode", QRcode)

// specifing the development and production port
let port = process.env.PORT || 3000;

//serving the homepage to the client
app.get("/",(req,res) => {
    res.sendFile(path.join(__dirname + "/client/index.html"));
})

// server port listening
app.listen(port, () => {
    console.log(`server listening at port ${port}`);
});
module.exports = app;