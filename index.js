// import all the necessary packages
const express = require("express");
var mongoose = require("mongoose");
let taskRoutes = require("./routes/router");

// we are using port 8000
const port = 8000;

var app = express();

//mongodb connection 
mongoose.connect("mongodb://localhost/task_app",{ useNewUrlParser: true})
.then(() => console.log("connection is successfull"))
.catch((error) => console.log(error));

app.use(express.json());
app.use(taskRoutes);


// start the server in the port 8000
app.listen(port, () => {
  console.log(`Listening to http://localhost:${port}`);
});

module.exports = app;