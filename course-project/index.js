// express is a web development fremewrok in nodejs , called if express js 
const db = require("mongoose");
const course = require("./routes/courses");
const home = require("./routes/home");
const authorroute = require("./routes/authors");
const express = require("express");

const app = express(); // define express in app constant

const port = 8080; // set listening port of the service 

// connect the database 
db.connect("mongodb://localhost/playground",{
    useNewUrlParser:true,
    useUnifiedTopology: true
}).catch((err)=>console.log(err.message));

// use for input json request, it matches thhe content type application/json 
// it is also like a middlewire 
app.use(express.json());
app.use("/api/course",course);
app.use("/api/author",authorroute);
app.use("/",home);

// listen or serve app in given port number like 3000,8000
app.listen(port,function(){
    console.log(`Server running at port ${port} on http://localhost:${port}`);
})