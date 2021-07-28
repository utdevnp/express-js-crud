 // use object destructuring , this validateCourse return the two array one is error
const { Course, validate } = require("../models/courseModel");
const express = require("express");
const router = express.Router();

// course list route
router.get("/", async (req,res)=>{
    const courses = await Course.find()
    .populate("author","name bio _id -_id")
    .sort("name");
    res.send(courses);
});

// find course with course id 
router.get("/:id", async (req,res)=>{

    // check the course exist or not , if not exist reurn the message
    var course = await Course.findById(req.params.id);
    if(!course) return res.status(404).send("Requested course not found");

    res.send(course); // send response to the route .
});

// handle the post req
router.post("/", async (req,res)=>{
    // input validation using joi package
    const {error}= validate(req.body);
    // if validate return error 
    if(error) return res.status(400).send(error.details[0].message);

    // add the course in array using array push
    let courseadd = new Course({
        name: req.body.name, // request input name  {"name":"New course"}
        author: req.body.author,
        tags: req.body.tags,
        price: req.body.price,
        isPublish: req.body.isPublish
    });

    courseadd = await courseadd.save(); // new course push back to courses array
    res.send(courseadd);
});


// update course
router.put("/:id", async (req,res)=>{

    // vaidation
    // input validation using joi package 

    // use object destructuring , this validateCourse return the two array one is error

    const {error}= validate(req.body);
    if(error) return res.status(400).send(error.details[0].message);

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
router.delete("/:id",async function(req,res){
  
    let course = await Course.findByIdAndRemove(req.params.id);
    if(!course) return res.status(404).send("Requested course not found");
    res.send(course);

});


module.exports = router