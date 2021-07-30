const express = require("express");
// define express in app constant
const app = express(); 

// import exports startup functions
require("./startup/logging")();
require("./startup/routes")(app);
require("./startup/db")();
require("./startup/config")();

// listen or serve app in given port number like 3000,8000
const port = 8080; // set listening port of the service 
app.listen(port,function(){
    console.log(`Server running at port ${port} on http://localhost:${port}`);
})