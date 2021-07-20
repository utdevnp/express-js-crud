const db = require("mongoose");
// joi package used  for the validation of request body input it is external
const Joi  = require("joi");
// make the model of the course and schema
const Course = db.model("Course", new db.Schema({
    name: {
        type: String,
        required: true
    },
    author: {
        type: String,
        required: true
    },
    tags:{
         type: Array
    },
    price:{
        type: Number,
        get: v=> Math.round(v),
        set: v=> Math.round(v)
    },
    isPublish: Boolean
}));


// course input validation using Joi package , https://www.npmjs.com/package/joi
function validateCourse(course){
    const schema = Joi.object({
        name: Joi.string().min(3).required(),
        author: Joi.string(),
        tags: Joi.array(),
        price: Joi.number(),
        isPublish:Joi.bool()
    });

    return  schema.validate(course);
}


exports.Course = Course;
exports.validate = validateCourse;