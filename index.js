const express = require("express");
const bodyParser = require("body-parser");
const path = require("path");
const cors = require("cors");

var app = express();

// setting up the cross origin resource sharing
app.use(cors());

//requiring routers
var signin_router = require("./server/Routers/loginRouter");
var signup_router = require("./server/Routers/signupRouter");

// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }))
// parse application/json
app.use(bodyParser.json())

// seriving static files
app.use(express.static("exam_management_sys"));

// specifing the development and production port
var port = process.env.PORT || 3000;

//serving the homepage to the client
app.get("/",(req,res) => {
    res.sendFile(path.join(__dirname + "/patient.html"));
})

// server port listening
app.listen(port, () => {
    console.log(`server listening at port ${port}`);
});
module.exports = app;