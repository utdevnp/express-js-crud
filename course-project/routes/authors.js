const requireLogin = require("../middlewire/requireLogin");
const { Author, validate} = require("../models/authorModel");
const express = require("express");
const router = express.Router();


router.get("/", requireLogin, async (req,res)=>{
   const  author = await Author.find();
    res.send(author)
})

// insert author 
router.post("/", requireLogin, async (req,res)=>{
   

    // insert author
    const authoradd = new Author({
        name:req.body.name,
        bio:req.body.bio,
        website:req.body.website
    });

    const authorSave = await authoradd.save();
    res.send(authorSave);
})


module.exports = router