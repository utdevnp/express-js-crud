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

})