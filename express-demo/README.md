
## Api using express CRUD

### Database  
<pre>
   Array Object 
   var courses  = [
        {id:1,name:"Mario Game"},
        {id:2,name:"PHP Web development"},
        {id:3,name:"Java Spring"},
        {id:4,name:"Ruby on Rails"},
    ];
</pre>

### You may clone repo and check the practice examples
<pre>
    git clone https://github.com/utdevnp/express-js-crud.git
</pre>

### Packages used 
<pre>
    Express: https://www.npmjs.com/package/express
    Joi: https://www.npmjs.com/package/joi
    Nodemon : https://www.npmjs.com/package/nodemon, for auto reloading app in dev mode
</pre>

### Routes 
<pre>

    Get : /api/course
    Get : /api/course/1
    POST : /api/course, {"name":"abc course"} in  application/json
    PUT : /api/course/1, {"name":"abc course"} in  application/json
    DELETE: /api/course/1

</pre>


### Express demo example link : https://runkit.com/utdevnp/crud-api-using-array

### Happy Coding :smile: