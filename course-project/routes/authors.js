const { Author, validate} = require("../models/authorModel");
const express = require("express");
const router = express.Router();

router.get("/", async (req,res)=>{
   const  author = await Author.find();
    res.send(author)
})

// insert author 
router.post("/",async (req,res)=>{
    const {error} = validate(req.body);
    if(error) return res.send(400).body(error.details[0].message);

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