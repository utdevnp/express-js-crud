const express = require("express");
// Middleware
const logger = require("../middlewire/logger");

// routes
const course = require("../routes/courses");
const home = require("../routes/home");
const authorroute = require("../routes/authors");
const users = require("../routes/users");
const auth   = require("../routes/auth");

module.exports = function(app){
    
    // use for input json request, it matches thhe content type application/json 
    // it is also like a middlewire 
    app.use(express.json());
    
    app.use("/api/course",course);
    app.use("/api/author",authorroute);
    app.use("/api/user",users);
    app.use("/api/auth",auth);
    app.use("/",home);
    app.use(logger);

}