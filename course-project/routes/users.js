const jwt = require("jsonwebtoken")
const config = require("config");
const bcrypt = require("bcrypt");
const _lodash = require("lodash");
const {User,validate} = require("../models/userModel");
const express = require("express");
const router = express.Router();

router.post("/",async (req,res)=>{
    const {error} = validate(req.body);
    if(error) return res.status(400).send(error.details[0].message);

    // if user already exist 
    let user = await User.findOne({email:req.body.email});
    if(user) return res.status(400).send({error:"User already exist..."});

    try{
        const user = new User(_lodash.pick(req.body,['name','email','password']))
        user.password = await hashPassword(req.body.password);
        await user.save();

        const token = jwt.sign({_id:user._id},config.get("jwtSecretToken"));

        res.header("x-auth-header",token).send(_lodash.pick(user,['name','email',"_id"]));  

    }catch(ex){
        res.status(400).send(ex.message);
    }
  
    
})



async function hashPassword(password){
    const salt = await bcrypt.genSalt(10);
    const hash = await bcrypt.hash(password,salt);
   return hash;
}


module.exports = router;