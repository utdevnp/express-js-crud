const db  = require("mongoose");

db.connect("mongodb://localhost/playground",{useNewUrlParser:true,
useUnifiedTopology: true}).catch((err)=>console.log(err.message));
const authorSchema = new db.Schema({
    name: String,
    bio: String,
    website: String
});

const courseSchema = new db.Schema({
    name: String,
    authors : [authorSchema], // db.Schema.Types.ObjectId,
    price: Number,
    tags: Array,
    isPublish: Boolean
})

const Author = new db.model("Author",authorSchema);
const Course = new db.model("Course",courseSchema);


async function createCourse(name,author){

    let courseAdd = new Course({
        name: name,
        authors: author,
        proce: "10",
        isPublish:true,
        tags: ['js','es']
    });

    const save = await courseAdd.save();
    console.log(save);
}

async function getCourse(id){
    const course = await Course.findById(id);
    console.log(course);
}

// update author from the course 
async function updateAuthor(courseId){
    const course = await Course.findById(courseId);
    course.author.name = "Utshab Luitel";
    course.save();
    
    console.log("updated");
}

// update course or author by $set method
async function updateAuthorByUsingSet(courseId){
    await Course.update({ _id: courseId},{

        // set or update the nested object 

        // $set:{
        //     'author.name': 'Bikash Mankhu'
        // }

        // unset the nested object it 
        $unset:{
            'author': ''
        }
    });

    console.log("updated...");
}


async function addAuthors(courseId, author){
    const course = await Course.findById(courseId);
    course.authors.push(author);
    course.save();

    console.log("updated...");
}

async function removeAuthor(courseId,authorId){
    const course = await Course.findById(courseId);
    const author = course.authors.id(authorId);
    author.remove();
    course.save();

    console.log("... updated");
}

//createCourse("this is test course","610112a8f1327d0fb865797f")

// next method create with author schema
// createCourse("this is test course",[
//     new Author({name:"bastolag"}),
//     new Author({name:"rabing"}),
//     new Author({name:"nepalg"})
// ])



//getCourse("6101247ce21f0d42f44e38b5");

//updateAuthor("6101247ce21f0d42f44e38b5");

//updateAuthorByUsingSet('6101247ce21f0d42f44e38b5');

//addAuthors("610137a02da7f83214d395a8", new Author({name:"balkon"}) )


removeAuthor("610137a02da7f83214d395a8","610137a02da7f83214d395a7");