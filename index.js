// import all the necessary packages
const express = require("express");
const bodyParser = require("body-parser");
let todoRoutes = require("./routes/Todo");

// we are using port 8000
const port = 8000;

var app = express();
app.use(bodyParser.json());
// app.use(express.json());
app.use(todoRoutes);
// // middleware for cors to allow cross origin resource sharing
// app.use(cors());

// start the server in the port 8000
app.listen(port, () => {
  console.log(`Listening to http://localhost:${port}`);
});