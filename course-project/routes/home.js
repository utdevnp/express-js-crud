const express = require("express");
const router= express.Router();

// home page route 
router.get("/",function(req,res){
    res.send("Welcome to the book store");
});

module.exports = router

