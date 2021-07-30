const winston = require('winston');
module.exports = function(err,req,res,next){

    // write message to the file using winston
    winston.log("error",err.message,err);
    // error
    // warn
    // info
    // vervose
    // debug
    // silly

    res.status(500).send("Internal server error");
}
