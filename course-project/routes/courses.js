const valiadteObjId = require("../middlewire/validateObjectId");

const validateInput = require("../middlewire/validateInput"); 
// use object destructuring , this validateCourse return the two array one is error

const { Course, validateCourse } = require("../models/courseModel");
const requireLogin = require("../middlewire/requireLogin");
const isAdmin = require("../middlewire/isAdmin");


const express = require("express");
const { Author } = require("../models/authorModel");
const validateObjectId = require("../middlewire/validateObjectId");
const router = express.Router();




// course list route
router.get("/", [requireLogin],  async (req,res)=>{
    // avoid Unhandle rejection , use TRY Catch block 
    // throw new Error("could not get course ...");
    const courses = await Course.find()
    .populate("author","name bio _id -_id")
    .sort("name");
    res.send(courses); 
});

// find course with course id 
router.get("/:id", [requireLogin,valiadteObjId], async (req,res)=>{
   
    // check the course exist or not , if not exist reurn the message
    var course = await Course.findById(req.params.id);
    if(!course) return res.sendStatus(404).send("Course not found");
    res.send(course); // send response to the route .
});

// handle the post req
router.post("/", [requireLogin,validateInput(validateCourse)], async (req,res)=>{
    // input validation using joi package
    //const {error}= validate(req.body);
    // if validate return error 
   // if(error) return res.status(400).send(error.details[0].message);

    // add the course in array using array push
    let courseadd = new Course({
        name: req.body.name, // request input name  {"name":"New course"}
        //author: new Author({name:req.body.author}),
        author:req.body.author,
        tags: req.body.tags,
        price: req.body.price,
        isPublish: req.body.isPublish
    });

    courseadd = await courseadd.save(); // new course push back to courses array
    res.send(courseadd);
});


// update course
router.put("/:id", [requireLogin,valiadteObjId,validateInput(validateCourse)], async (req,res)=>{

    // find course 
    const course  = await Course.findByIdAndUpdate(req.params.id);
    if(!course) return res.status(404).send("Request course not found");

    
    course.name = req.body.name;
    course.author = req.body.author;
    course.tags = req.body.tags;
    course.price = req.body.price;
    course.isPublish = req.body.isPublish;

    const result = await course.save()
    res.send(result);
});

// delete course
router.delete("/:id", [requireLogin, valiadteObjId], async function(req,res){
  
    let course = await Course.findByIdAndRemove(req.params.id);
    if(!course) return res.status(404).send("Requested course not found");
    res.send(course);

});


module.exports = router