const _lodash = require("lodash");
const {User,validate,userSchema} = require("../models/userModel");
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
        await user.save();
        res.send(_lodash.pick(user,['name','email',"_id"]));  

    }catch(ex){
        res.status(400).send(ex.message);
    }
  
    
})

module.exports = router;