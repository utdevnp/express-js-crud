const EventEmitter = require("events");

class Logger extends EventEmitter{

    // define method 
    log(message){

        console.log(message);
        //raise an event 
        this.emit("messageLogged",message);
    }
}

module.exports = Logger;