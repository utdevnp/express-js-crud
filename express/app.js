var express = require("express");

const app = express();

app.get("/",function(req,res){
    res.send("<h1>Hello World</h1>");
});

app.get("/books",function(req,res){

    // get the query string parameter
    const id = req.query.id
    var response = "";
    if(id >0){
        response = "this is a book list " + id;
    }else{
        response = "this is a book list ";
    }

    res.send(response);
       
})

app.get("/books/:id",function(req, res){

    const id = req.params.id // get the route parameter 
    res.send("Id of book is : "+id);
});

app.listen(8080,function(){
    console.log("server is running in http://127.0.0.1:8080");
});
