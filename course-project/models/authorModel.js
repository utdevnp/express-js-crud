const db  = require("mongoose");
const Joi = require("joi");
const Author = db.model("Author", db.Schema({
    name:{
        type: String,
        required:true
    },
    bio:{
        type:String,
        required:true
    },
    website:{
        type:String,
        required:true
    }
}));


/// valudate by joi
function validateAuthor(author){
    const schema = Joi.object({
        name: Joi.string().min(3).required(),
        bio: Joi.string(),
        website: Joi.string()
    })

    return  schema.validate(author);

}


exports.Author = Author;
exports.validate = validateAuthor;