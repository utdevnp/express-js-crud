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

test.only("When logged in can see blog create form", async ()=>{
    await page.login();
    await page.click("a.btn-floating");
    const text = await page.getContentsOf("form label");
    expect(text).toEqual("Blog Title");
    //await page.goto("localhost:3000/blogs");
});