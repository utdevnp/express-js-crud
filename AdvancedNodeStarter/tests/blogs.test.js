// define page 
const Page = require("./helpers/page");
let page;

beforeEach( async () => {
    page = await Page.build();
    await page.goto("localhost:3000");
});

afterEach(async ()=>{
    await page.close();
});



describe("When logged in", async()=>{
    beforeEach( async ()=>{
        await page.login();
        await page.click("a.btn-floating");
    });

    test("Can see blog create form", async ()=>{
        const text = await page.getContentsOf("form label");
        expect(text).toEqual("Blog Title");
        //await page.goto("localhost:3000/blogs");
    });

    // nesting 
    describe("And using valid inputs", async ()=>{
        beforeEach( async ()=>{
            await page.type(".title input","This is blog title from the test");
            await page.type(".content input","this is blog description test");            
            await page.click("form button");
        })

        test("submitting takes in review page ",async ()=>{
            const text = await page.getContentsOf("form h5");
            expect(text).toEqual("Please confirm your entries");

        });

        test("Submitting and saving the blogs, get index page",async ()=>{
            await page.click("button.green");
            await page.waitFor(".card"); // waiting for request complete 

            const title = await page.getContentsOf(".card-title");
            const content = await page.getContentsOf(".card-content p");
            const readmore = await page.getContentsOf(".card-action a");

            expect(title).toEqual("This is blog title from the test");
            expect(content).toEqual("this is blog description test")
            expect(readmore).toEqual("Read");

        })
    })

    describe("And using invalid inputs", async ()=>{
        beforeEach( async ()=>{
            await page.click("form button");
        })
        test("the form shows error message on click save", async ()=>{
            const titleErr = await page.getContentsOf(".title .red-text");
            const contentErr = await page.getContentsOf(".content .red-text");

            expect(titleErr).toEqual("You must provide a value");
            expect(contentErr).toEqual("You must provide a value");
        });
    });

});

describe("When user is not logged in", async()=>{

    // test("User cannot create blog post", async() =>{
    //     // use evaluate for the api calling usinng Fetch
    //     const result  = await page.get("/api/blogs");      
    //     expect(result).toEqual({ error: 'You must log in!' });
    // });

    // test("User cannot get the posts",async ()=>{
    //     const result = await page.post("/api/blogs",{name:"my content", content:"conent"});
    //     expect(result).toEqual({error:'You must log in!'});
    // });

    test("Blog related api test", async ()=>{
        // make object of the possiable same result apis
         // methos are define as page.get and page.post in array
        const actions = [
            {
                method:"post",
                path:"/api/blogs",
                data:{
                    name:"my content",
                    content:"conent"
                }
            },
            {
                method:"get",
                path:"/api/blogs"

            }
        ];

        const results  = await page.executeRequest(actions);
        // iterate over result 
        for(let result of results){
            // result must be same , otherwise test will be fail
            expect(result).toEqual({error:'You must log in!'})
        }

    })
})