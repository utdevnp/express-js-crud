const db = require("mongoose");
const Joi = require('joi');
const userSchema = new db.Schema({
    name:{
        type: String,
        required:true
    },
    email:{
        type: String,
        unique:true, 
    },
    password:{
        type:String,
        required:true
    }
});

const User = new db.model("User",userSchema);

function validate(user){
    const schema = Joi.object({
        name:Joi.string().required(),
        email:Joi.string().required().email(),
      
    });
    return  schema.validate(user);

}

function validateLogin(user){
    const schema = Joi.object({
        email:Joi.string().required().email(),
        password: Joi.string().required()
    });
    return  schema.validate(user);

}

module.exports.User = User;
module.exports.validate = validate;
module.exports.validateLogin = validateLogin;