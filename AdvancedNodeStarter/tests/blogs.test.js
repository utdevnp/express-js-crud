// define page 
const Page = require("./helpers/page");
let page;

beforeEach( async () => {
    jest.setTimeout(15000);
    page = await Page.build();
    await page.goto("localhost:3000");
});

afterEach(async ()=>{
    await page.close();
});