const Logger = require("./logger");

// make object of the class Logger
const logger = new Logger()

// register listener
logger.on("messageLogged",function(arg){
    console.log("Event triggered",arg);
})

// call the log method from logger object 
logger.log("Hello");