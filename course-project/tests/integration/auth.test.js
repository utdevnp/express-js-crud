const request = require("supertest");
const courseFactory = require("../factories/courseFactory");
const {User} = require("../../models/userModel");
const db = require("mongoose");
let server ;
