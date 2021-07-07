const fs = require("fs");

var dir = fs.readdirSync("./");

console.log(dir)

fs.readdir("./",function(err,files){

    // handle error 
    if(err) console.log("Error", err);
    
    else console.log("Result",files);
});