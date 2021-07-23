const { clearHash } = require("../services/cache");

module.exports = async (req,res, next)=>{
    // wait for the complete action if the request 
    await next()
    // clear cash after action is complete 
    clearHash(req.user.id);

}