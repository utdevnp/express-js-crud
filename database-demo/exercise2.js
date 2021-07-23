/* 
    Get all the published frontend and backend courses,
    Sort them by their price in desc order,
    Pick only their name and author,
    and display them

*/

// import module 
const db  = require("mongoose");

// connect the db , to remove warning parse given parameters 
// {useNewUrlParser:true, useUnifiedTopology:true}
// playground is a database 
db.connect("mongodb://localhost/playground",
    {useNewUrlParser:true, useUnifiedTopology:true}
).catch(
    err =>console.log(err.message)
)

// make Schema 
const courseSchema = db.Schema({
    name: String,
    tags: [ String ],
    date: {type:Date, default:Date.now},
    author: String,
    isPublish: Boolean
})

// make the model of the schema , Course
const Course  = db.model("Course",courseSchema);

// get the data or slect the data from Course

async function getCourseWithFilter(){
    const course = await Course.find(
        {
            isPublish:true, 
            tags:{
                $in: ['frontend','backend']
            }
        })
        //.or([{tags:"frontend"},{tags:"backend"}])
        .sort({name: -1})
        .select({name:1, author:1})

    console.log(course);
}

getCourseWithFilter();


