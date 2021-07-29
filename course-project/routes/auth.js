const bcrypt = require("bcrypt");
const {User,validateLogin} = require("../models/userModel");
const express = require("express");
const router = express.Router();

router.post("/",async (req,res)=>{
    const {error} = validateLogin(req.body);
    if(error) return res.status(400).send(error.details[0].message);

    // if user already exist 
    let user = await User.findOne({email:req.body.email});
    if(!user) return res.status(400).send({error:"Invalid email or password"});

    const isUser  = await bcrypt.compare(req.body.password, user.password);
    if(!isUser) return res.status(400).send({error:"Invalid email or password"})
    
    const token = user.generateAuthToken();
    //res.send(_lodash.pick(user,['name','email',{"token":token}]));
    res.header("x-auth-header",token).send({token:token});
})



module.exports = router;