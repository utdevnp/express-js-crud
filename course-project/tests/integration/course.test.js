const request = require("supertest");
const {Course} = require("../../models/courseModel");
const {User} = require("../../models/userModel");
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
    })

    describe("GET/:id", ()=>{
        it("should return course if valid id is pass", async ()=>{
            const course =  new Course({
                "name": "Angular Course 2021",
                "author": "61013ed3ff155a0744a4577d",
                "isPublish": true,
                "tags":["js","ts"],
                "price": 10
              });
            await course.save();

            const res = await request(server).get("/api/course/"+course._id);
            expect(res.status).toBe(200);
            expect(res.body).toHaveProperty("name", course.name);
        });

        it("should return 404 error if id is invalid ",async  ()=>{
            const res = await request(server).get("/api/course/jdhaskhdkas");
            expect(res.status).toBe(404)
        })
    })

    describe("POST/",()=>{
        it("should return 401 when user is not log in", async ()=>{
            const res = await request(server)
                        .post("/api/course")
                        .send(
                            {
                                "name": "Angular Course 2021",
                                "author": "61013ed3ff155a0744a4577d",
                                "isPublish": true,
                                "tags":["js","ts"],
                                "price": 10
                              }
                        )
            expect(res.status).toBe(401);

        })

        it("should return 400 if course is invalid", async ()=>{

            const token  = new User({isAdmin:false}).generateAuthToken();

            const res = await request(server)
                .post("/api/course")
                .set("x-auth-header",token)
                .send(
                    {
                        "name": "An",
                        "author": "61013ed3ff155a0744a4577d",
                        "isPublish": true,
                        "tags":["js","ts"],
                        "price": 10
                    }
                )
            expect(res.status).toBe(400);
        })

    });


  

})