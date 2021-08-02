const db = require("mongoose"); 

module.exports = function(req, res, next){
    const isValid = db.Types.ObjectId.isValid(req.params.id);
    if(!isValid)  return res.status(404).send("id is not valid");

    next();
}