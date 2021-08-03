const db = require("mongoose");
// joi package used  for the validation of request body input it is external
const Joi  = require("joi");
const { authorSchema } = require("./authorModel");
// make the model of the course and schema
const Course = new db.model("Course", new db.Schema({
    name: {
        type: String,
        required: true
    },
    author: {
        type: db.Schema.Types.ObjectId, //authorSchema,
        ref: 'Author',
        required:true
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
        name: Joi.string().min(5).required(),
        tags: Joi.array(),
        author: Joi.string(),
        price: Joi.number(),
        isPublish:Joi.bool()
    });

    return  schema.validate(course);
}


exports.Course = Course;
exports.validateCourse = validateCourse;