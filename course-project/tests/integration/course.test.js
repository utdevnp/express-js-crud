const request = require("supertest");
const {Course} = require("../../models/courseModel");
let server ;

describe("/api/course",()=>{
    beforeEach(()=>{ server  = require("../../index"); })
    afterEach( async ()=>{ 
        server.close(); 
        // clean the data after test execute 
        await Course.deleteMany({});
    })

    describe("GET/",  ()=>{
        it("should return all course listed in db",async ()=>{
            await Course.collection.insertMany([
                {
                    "name": "Angular Course 2021",
                    "author": "61013ed3ff155a0744a4577d",
                    "isPublish": true,
                    "tags":["js","ts"],
                    "price": 10
                  }
            ])
            const res = await request(server).get("/api/course");
            expect(res.status).toBe(200);
            expect(res.body.length).toBe(1);
            expect(res.body.some(c=>c.name === "Angular Course 2021")).toBeTruthy();
          
        })

       // it("should return wit")
    })

})