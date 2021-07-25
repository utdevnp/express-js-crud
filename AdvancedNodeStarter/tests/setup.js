// jest setup and configure model user
require("../models/User");

const mongoose = require("mongoose");
const keys = require("../config/keys");

mongoose.Promise = global.Promise;
mongoose.connect(keys.mongoURI,{useMongoClient:true});