// EventEmitter is class
const EventEmitter = require('events');

// make object of given class 
const emitter = new EventEmitter();

// Register the event usng addlistener
emitter.on("messageLogs",function(arg){
    console.log("Emitter called,", arg);
    console.log('Emitter called with signle arg value', arg.id);
})

// make event 
emitter.emit("messageLogs",{id:"1", url:"http://"}); // pass the data  usng object