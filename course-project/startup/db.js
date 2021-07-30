const db = require("mongoose");
const winston = require("winston");

module.exports = function(){
    
    // connect the database 
    db.connect("mongodb://localhost/playground",{
        useNewUrlParser:true,
        useUnifiedTopology: true
    }).then(() => winston.info("MongoDB Connected..."));

}