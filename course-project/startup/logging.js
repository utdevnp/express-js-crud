// error handling

require("express-async-errors");
const winston = require("winston");
require("winston-mongodb");
module.exports = function(){
        
    // save log mssage in the logger.log using winston
    winston.add(new winston.transports.File({filename: "logger.log"}));
    // save log into the database 
    //winston.add(new winston.transports.MongoDB({db:"mongodb://localhost/playground"}))


    // to handle exception out of express scope

    winston.exceptions.handle(
        new winston.transports.Console(),
        new winston.transports.File({filename:"unhandleException.log"})
    )

    

    // to handle unhandle rejection
    process.on("unhandledRejection",(exc)=>{ 
        throw exc;
    })
}