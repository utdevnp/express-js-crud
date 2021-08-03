
const request = require("supertest");
const {Course} = require("../../models/courseModel");
const courseFactory = require("../factories/courseFactory");
const {User} = require("../../models/userModel");
const db = require("mongoose");
let server ;


describe("/api/course",()=>{

    let token; 
    
    beforeEach(()=>{ 
        //jest.setTimeout(150000);
        server  = require("../../index"); 
        token  = new User({isAdmin:false}).generateAuthToken();
    })
    afterEach( async ()=>{ 
        server.close(); 
        // clean the data after test execute 
        await Course.deleteMany({});
    })

    describe("GET/",  ()=>{

        it("should return all course listed in db",async ()=>{
            courseFactory.createMany();

            const res = await request(server)
                        .get("/api/course")
                        .set('x-auth-header',token);

            expect(res.status).toBe(200);
            expect(res.body.length).toBe(1);
            expect(res.body.some(c=>c.name === courseFactory.data().name)).toBeTruthy();
          
        })
        
        it("should return 401 when x-auth-header is not set", async ()=>{
            token = '';
            const res = await request(server).get("/api/course");
            expect(res.status).toBe(401);

        })
    })

    describe("GET/:id", ()=>{
        it("should return course if valid id is pass", async ()=>{
            const course  = await courseFactory.create();

            const res = await request(server)
                .get("/api/course/"+course._id)
                .set("x-auth-header",token);
            expect(res.status).toBe(200);
            expect(res.body).toHaveProperty("name", course.name);
        });

        it("should return 404 error if id is invalid ",async  ()=>{
            const res = await request(server)
            .get("/api/course/jdhaskhdkas")
            .set("x-auth-header",token);
            expect(res.status).toBe(404)
        })

        it("should return 404 if course not exist in given id ", async  ()=>{
            const id = db.Types.ObjectId();
            const res = await request(server)
            .get("/api/course/"+id)
            .set('x-auth-header',token);
            expect(res.status).toBe(404)
        })

    })

    describe("POST/",()=>{
        it("should return 401 when user is not log in", async ()=>{
            const res = await request(server)
                .post("/api/course")
                .send(courseFactory.data())
            expect(res.status).toBe(401);

        })

        it("should return 400 if course is invalid", async ()=>{
            const res = await request(server)
                .post("/api/course")
                .set("x-auth-header",token)
                .send(courseFactory.invalidData())
            expect(res.status).toBe(400);
        })

        it("should save valid course input ", async ()=>{
            const res = await request(server)
                .post("/api/course")
                .set("x-auth-header",token)
                .send(courseFactory.data())

            expect(res.body).not.toBeNull();
            expect(res.status).toBe(200);
        })

        it("should return course body, if valid course input ", async ()=>{

        
            const res = await request(server)
                .post("/api/course")
                .set("x-auth-header",token)
                .send(courseFactory.data())

            expect(res.status).toBe(200);
            expect(res.body).toHaveProperty("_id");
            expect(res.body).toHaveProperty("name",courseFactory.data().name);
        })

    });

    describe("DELETE/", ()=>{

        it("should return 200 if course deleted with valid id",async ()=>{
            const course  = await courseFactory.create();

            const res = await request(server)
                .delete("/api/course/"+course._id)
                .set("x-auth-header",token);

            expect(res.status).toBe(200);
        })

        it("should return 401 where x-auth-header is not set", async ()=>{
            const course  = await courseFactory.create();
            const res = await request(server)
                .delete("/api/course/"+course._id)
                //.set("x-auth-header",token);

            expect(res.status).toBe(401);
        })

        it("should return 404 if id is invalid",async ()=>{
            await courseFactory.create();
            const res = await request(server)
                .delete("/api/course/"+ db.Types.ObjectId())
                .set("x-auth-header",token);

            expect(res.status).toBe(404);
        })
    })

    describe("PUT/:id", ()=>{
        
        it("should return 200 if valid input and valid id",async()=>{
           
            const course  = await courseFactory.create();

            const res = await request(server).put("/api/course/"+course._id)
                .set('x-auth-header',token)
                .send(courseFactory.data());

            expect(res.status).toBe(200);
            expect(res.body).toHaveProperty("_id");
            expect(res.body.name).toEqual(courseFactory.data().name);
            
        })

        it("should return 401 if x-auth toekn not provided",async ()=>{
            const course  = await courseFactory.create();
            token  = '';
            const res = await request(server).put("/api/course/"+course._id)
                .set('x-auth-header',token)
                .send(courseFactory.data());

            expect(res.status).toBe(401);
        });

        it("should return 404 if valid id is not exist ", async()=>{
            await courseFactory.create();
       
            const id = db.Types.ObjectId();
            const res = await request(server).put("/api/course/"+id)
                .set('x-auth-header',token)
                .send(courseFactory.data());

            expect(res.status).toBe(404);
        })
    })


  

})