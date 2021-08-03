const db = require("mongoose");
const jwt = require("jsonwebtoken");
const config = require("config");
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
    },
    isAdmin:Boolean
});

// generte auth token attached to user

userSchema.methods.generateAuthToken = function (){
   const token =  jwt.sign({_id:this._id,isAdmin:this.isAdmin},config.get("jwtSecretToken"));
    return token;
}


const User = new db.model("User",userSchema);

function validate(user){
    const schema = Joi.object({
        name:Joi.string().required().min(5).max(50),
        email:Joi.string().required().email(),
        password: Joi.string().required(),
        isAdmin: Joi.boolean()
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