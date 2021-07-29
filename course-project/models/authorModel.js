const db  = require("mongoose");
const Joi = require("joi");

const authorSchema =  new db.Schema({
    name:{
        type: String,
        required:true
    },
    bio:{
        type:String,
        //required:true
    },
    website:{
        type:String,
       // required:true
    }
});

const Author = new db.model("Author",authorSchema);


/// valudate by joi
function validateAuthor(author){
    const schema = Joi.object({
        name: Joi.string().min(3),
        bio: Joi.string(),
        website: Joi.string()
    })

    return  schema.validate(author);

}


exports.Author = Author;
exports.validate = validateAuthor;
exports.authorSchema = authorSchema;