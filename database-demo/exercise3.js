/* 
    Get All the published courses that are $15 or more ,
    or have the word 'by' in their title

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
        })
        .or([
            {price:{$gte:15}},
            {name:/.*by.*/}
        ])
        .sort({name: -1})
        .select({name:1, author:1})

    console.log(course);
}

getCourseWithFilter();


