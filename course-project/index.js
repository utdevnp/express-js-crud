// express is a web development fremewrok in nodejs , called if express js 
// package or module
require("express-async-errors");
const db = require("mongoose");
const config = require("config");
const winston = require("winston");
require("winston-mongodb");
const express = require("express");

const app = express(); // define express in app constant
require("./startup/routes")(app);


// save log mssage in the logger.log using winston
winston.add(new winston.transports.File({filename: "logger.log"}));
// save log into the database 
winston.add(new winston.transports.MongoDB({db:"mongodb://localhost/playground"}))


// to handle exception out of express scope

winston.handleExceptions(
    new winston.transports.File({filename:"unhandleException.log"})
)



// to handle unhandle rejection
process.on("unhandledRejection",(ex)=>{
    throw ex;
})

// cehck the jwt set or not 
if(!config.get("jwtSecretToken")) {
    console.log("ERROR...","JWT Token not set ");
    process.exit(1);
} 


// connect the database 
db.connect("mongodb://localhost/playground",{
    useNewUrlParser:true,
    useUnifiedTopology: true
}).catch((err)=>console.log(err.message));

// error handling

// listen or serve app in given port number like 3000,8000
const port = 8080; // set listening port of the service 
app.listen(port,function(){
    console.log(`Server running at port ${port} on http://localhost:${port}`);
})