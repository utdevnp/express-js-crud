const request = require("supertest");
const requireLogin = require("../../../middlewire/requireLogin");
const {User} = require("../../../models/userModel");
const db = require("mongoose");

describe("Require login",()=>{

    it("should populate req.user with valid JWT token", async ()=>{
        const userd = {
            _id: db.Types.ObjectId().toHexString(),
             isAdmin:true
        }
        const token  = new User(userd).generateAuthToken();
        const req = {
            header: jest.fn().mockReturnValue(token)
        };
        const res = {};
        const next= jest.fn();

        requireLogin(req, res, next);

        expect(req.user).toBeDefined();
        expect(req.user).toMatchObject(userd);
    })
})