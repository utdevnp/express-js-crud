/* 
    {
        App Name : Courses CRUD,
        By: Utdev
        Packages : {
            Express: https://www.npmjs.com/package/express,
            Joi: https://www.npmjs.com/package/joi
            Nodemon : https://www.npmjs.com/package/nodemon, for auto reloading app in dev mode
        },
        Routes:{
            Get : /api/course
            Get : /api/course/1
            POST : /api/course, {"name":"abc course"} in  application/json
            PUT : /api/course/1, {"name":"abc course"} in  application/json
            DELETE: /api/course/1
        }
    }

*/

// joi package used  for the validation of request body input it is external
const Joi  = require("joi");

// express is a web development fremewrok in nodejs , called if express js 
const express = require("express");
const app = express(); // define express in app constant


const port = 8080; // set listening port of the service 

// use for input json request, it matches thhe content type application/json 
// it is also like a middlewire 
app.use(express.json());

// make the courses lists
var courses  = [
    {id:1,name:"Mario Game"},
    {id:2,name:"PHP Web development"},
    {id:3,name:"Java Spring"},
    {id:4,name:"Ruby on Rails"},
];

// home page route 
app.get("/",function(req,res){
    res.send("Welcome to the book store");
})

// course list route
app.get("/api/course",(req,res)=>{
    res.send(courses);
})

// find course with course id 
app.get("/api/course/:id",(req,res)=>{

    // check the course exist or not , if not exist reurn the message
    var course = courses.find(c=>c.id == req.params.id);
    if(!course) return res.status(404).send("Requested course not found");

    res.send(course); // send response to the route .
});

// handle the post req
app.post("/api/course",function(req,res){

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
app.put("/api/course/:id",(req,res)=>{
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
app.delete("/api/course/:id",function(req,res){
  
    var course = courses.find(c=>c.id == req.params.id);
    if(!course) return res.status(404).send("Requested course not found");
    // delete part. or remove index from array
    const index = courses.indexOf(course);
    courses.splice(index,1);

    res.send(course);

})


// course input validation using Joi package , https://www.npmjs.com/package/joi
function validateCourse(course){
    const schema = Joi.object({
        name: Joi.string().min(3).required()
    });

    return  schema.validate(course);
}

// listen or serve app in given port number like 3000,8000
app.listen(port,function(){
    console.log(`Server running at port ${port} on http://localhost:${port}`);
})