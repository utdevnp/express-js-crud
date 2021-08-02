const db = require("mongoose");
const winston = require("winston");
const config = require("config");
module.exports = function(){
    
    const database = config.get("db");
    // connect the database 
    db.connect(database,{
        useNewUrlParser:true,
        useUnifiedTopology: true,
        useCreateIndex:true
    }).then(() => winston.info("Connected to .. ".database));
    console.log(`Connected to ${database}`);

}