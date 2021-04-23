// Dependencies needed
const express = require("express");
const fs = require("fs");
const path = require("path");

// express data will start the application
const app = express();
const PORT = process.env.PORT || 3000;

//will find and load data
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.static(__dirname));

//routes needed
require('./routes/apiRoutes')(app);
// app listening port
app.listen(PORT, function() {
    console.log("App listening on PORT: " + PORT);
}); 