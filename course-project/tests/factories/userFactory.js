const {User} = require("../../models/userModel");

function create(){
    const user = new User(validData());
    user.save();
}

function createMany(){
    User.collection.insertMany([validData()]);
}


function validData(){
    return {
        name: "utdev l",
        email: "utdevnp@gmail.com",
        passowrd: "12345",
        isAdmin: false
    }
}

function inValidData(){
    return {
        name: "utde",
        email: "utdevnp.gmail.com",
        passowrd: "12345",
        isAdmin: false
    }
}

module.exports