// import module
const db = require("mongoose");
// connect the database 
db.connect("mongodb://localhost/playground",{
    useNewUrlParser:true,
    useUnifiedTopology: true
}).catch(err =>console.log(err.message));

// make the schema 
const courseSchema = db.Schema({
    name: String,
    author: String,
    tags: [ String ],
    date : {type:Date, default:Date.now},
    isPublish: Boolean
});

// make model and return the model as a class
const Course = db.model("Course",courseSchema);
// make ojbect of the Course model 
//const course = new Course();

// get course by author name 
async function getCourseByAuthor(author){
    const course =  await Course.find({author:author,isPublish:true});
    console.log(course);
}
 getCourseByAuthor("Utdev") // Utdev, Dipak, Utshab


// get course by tag and published true,also sort by name with select name and author

async function getCourseByTag(tags){
    const course  = await Course.find({isPublish:true,tags:tags })
        .sort({name:1})
        .select({name:1,author:1});

        console.log(course);
}

getCourseByTag('js');