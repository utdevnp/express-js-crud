const config = require("config");
module.exports = function(){
    // cehck the jwt set or not 
    if(!config.get("jwtSecretToken")) {
        throw new Error("ERROR...","JWT Token not set ");
    } 

}