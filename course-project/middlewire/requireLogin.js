const jwt  = require("jsonwebtoken");
const config = require("config");

module.exports = (req, res, next)=>{

    const token = req.header("x-auth-header");
    if(!token)  return res.status(401).send("Auth token not provided..");

    try{    
        const decode = jwt.verify(token,config.get('jwtSecretToken'));
        // set the decoded user data to the request user 
        req.user = decode;
        next();
    }catch(ex){
        return res.status(401).send("Invalid auth token");
    }
    
}
