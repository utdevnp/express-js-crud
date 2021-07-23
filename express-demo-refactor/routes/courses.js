
// joi package used  for the validation of request body input it is external
const Joi  = require("joi");
const express = require("express");
const router = express.Router();
// make the courses lists
var courses  = [
    {id:1,name:"Mario Game"},
    {id:2,name:"PHP Web development"},
    {id:3,name:"Java Spring"},
    {id:4,name:"Ruby on Rails"},
];



// course list route
router.get("/",(req,res)=>{
    res.send(courses);
})

// find course with course id 
router.get("/:id",(req,res)=>{

    // check the course exist or not , if not exist reurn the message
    var course = courses.find(c=>c.id == req.params.id);
    if(!course) return res.status(404).send("Requested course not found");

    res.send(course); // send response to the route .
});

// handle the post req
router.post("/",function(req,res){

    // input validation using joi package
    const {error}= validateCourse(req.body);
    // if validateCourse return error 
    if(error) return res.status(400).send(error.details[0].message);

    // add the course in array using array push
    var courseadd = {
        id:courses.length +1, // it will auto increment with total length + 1
        name:req.body.name // request input name  {"name":"New course"}
    };

    courses.push(courseadd); // new course push back to courses array
    res.send(courseadd);
});


// update course
router.put("/:id",(req,res)=>{
    // find course 
    var course = courses.find(c=>c.id == req.params.id);
    if(!course) return res.status(404).send("Request course not found");

    // vaidation
    // input validation using joi package 

    // use object destructuring , this validateCourse return the two array one is error
    const {error}= validateCourse(req.body);
    if(error) return res.status(400).send(error.details[0].message);

    course.name = req.body.name;
    res.send(course);
});

// delete course
router.delete("/:id",function(req,res){
  
    var course = courses.find(c=>c.id == req.params.id);
    if(!course) return res.status(404).send("Requested course not found");
    // delete part. or remove index from array
    const index = courses.indexOf(course);
    courses.splice(index,1);

    res.send(course);

});


// course input validation using Joi package , https://www.npmjs.com/package/joi
function validateCourse(course){
    const schema = Joi.object({
        name: Joi.string().min(3).required()
    });

    return  schema.validate(course);
}

module.exports = router