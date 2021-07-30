// express is a web development fremewrok in nodejs , called if express js 
// package or module
require("express-async-errors");
const db = require("mongoose");
const config = require("config");
const winston = require("winston");
require("winston-mongodb");
const express = require("express");

// Middleware
const logger = require("./middlewire/logger");

// routes
const course = require("./routes/courses");
const home = require("./routes/home");
const authorroute = require("./routes/authors");
const users = require("./routes/users");
const auth   = require("./routes/auth");

//throw new Error("error............");

// save log mssage in the logger.log using winston
winston.add(new winston.transports.File({filename: "logger.log"}));
// save log into the database 
winston.add(new winston.transports.MongoDB({db:"mongodb://localhost/playground"}))


// to handle exception out of express scope

winston.handleExceptions(
    new winston.transports.File({filename:"unhandleException.log"})
)

// process.on('uncaughtException',(ex)=>{
//     console.log("SOMTHING FAIL TO STARTUP....");
//     winston.log("error", ex.message,ex);
//     process.exit(1);
// })



// to handle unhandle rejection
process.on("unhandledRejection",(ex)=>{
    throw ex;
    // winston.log("error", ex.message,ex);
    // process.exit(1);
})


const app = express(); // define express in app constant

const port = 8080; // set listening port of the service 

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

// use for input json request, it matches thhe content type application/json 
// it is also like a middlewire 
app.use(express.json());
app.use("/api/course",course);
app.use("/api/author",authorroute);
app.use("/api/user",users);
app.use("/api/auth",auth);
app.use("/",home);

app.use(logger);

// error handling

// listen or serve app in given port number like 3000,8000
app.listen(port,function(){
    console.log(`Server running at port ${port} on http://localhost:${port}`);
})