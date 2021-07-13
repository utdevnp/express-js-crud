// require mongoose
const db = require("mongoose");
db.connect("mongodb://localhost/playground",{ useNewUrlParser: true } )
    .then(()=>console.log("Database connect successfully"))
    .catch(()=>console.log("Database not conected"))

const courseSchema  = db.Schema({
    name: String,
    author: String,
    tags: [ String ],
    isPublish: Boolean,
    date: {type:Date, default:Date.now}
})

// make the model using schema
// it Returns the Course class in the model
const Course = db.model("Course",courseSchema);
const pageNumber = 2;
const pageSize = 10;
// save the new course
async function createCourse(){
    // Now create the ojbect of this course
    const course = new Course({
        name:"Bootstarp Course",
        author:"Dipak",
        tags:['design','unxi','css'],
        isPublish:true
    })

    const result = await course.save();
    console.log(result);
}
createCourse();

// get the alll courses from database
async function getCourses(){

    // there are some operators 
    // eq, equal to 
    // ne, not equal to
    // gt, greater then
    // gte, greater then equal to
    // lt, less then 
    // lte ,less then equal to 
    // in, 
    // nin, not in 
    // --------------------------------------------------
    // Logical operator
    // and 
    // or

    // if you want find method hava a filter 
    const courses = await Course.find({author:"Utdev"})
    // also chain the method and build the query
    //.find({price:{$gt:10}})
    //.find({price:10})
    //.find({price:{$in:[10,20,30]}})
    .or([{author:"Utdev"},{isPublish:true}])

    // using regular expression
    .find({author:/^Utdev/}) //  starts with Utdev
    .find({author:/Utdev$/}) //  Ends with Utdev
    .find({author:/.*Utdev.*/}) //  with Utdev
    .find({author:/.*Utdev.*/i}) //  with Utdev with case insensetive

    .limit(2)
    .sort({name:1})
    .select({name:1,tags:1});
    // count the array
    //count(); // instate of select 

    // for pegination 
    skip(pageNumber -1 * pageSize)
    .limit(pageSize)
    console.log(courses);
}





