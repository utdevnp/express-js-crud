var http = require("http");

http.createServer(function(req,res){
    res.writeHead(200,{"Content-Type":"text/html"});
    res.write("Hello it is earth, you wanna go to mars?");
    res.end();
}).listen(8080);

