const mongoose = require("mongoose");
const url = 'mongodb://localhost/examManagementDB';
 
mongoose.connect(url, {
  useNewUrlParser: true,
  useUnifiedTopology: true
});

mongoose.Promise = global.Promise;