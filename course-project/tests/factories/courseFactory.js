const {Course} = require("../../models/courseModel");
    function create(){
        const course = new Course(
            {
                "name": "Angular Course 2021",
                "author": "61013ed3ff155a0744a4577d",
                "isPublish": true,
                "tags":["js","ts"],
                "price": 10
            }
        )
        return course.save();
    }

    function createMany(){
        Course.collection.insertMany([
            {
                "name": "Angular Course 2021",
                "author": "61013ed3ff155a0744a4577d",
                "isPublish": true,
                "tags":["js","ts"],
                "price": 10
            }
        ])
    }


    function data(){
        return  {
            "name": "Angular Course 2021",
            "author": "61013ed3ff155a0744a4577d",
            "isPublish": true,
            "tags":["js","ts"],
            "price": 10
        }
    }

    function invalidData(){
        return  {
            "name": "Ang",
            "author": "61013ed3ff155a0744a4577d",
            "isPublish": true,
            "tags":["js","ts"],
            "price": 10
        }
    }

module.exports.createMany = createMany;
module.exports.create  = create;
module.exports.data = data;
module.exports.invalidData = invalidData
