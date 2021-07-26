const Page = require("./helpers/page"); // import custom page


let page;
beforeEach(async ()=>{
    // if we get given message on test 
    // Timeout - Async callback was not invoked within the 5000ms timeout specified by jest.setTimeout.
    // please set jest timeout 

    page = await Page.build();
    // open our project 
    await page.goto("localhost:3000");
})

afterEach( async ()=>{
    await page.close()
    //jest.clearAllTimers();
})

// check heder test is correct or not 
test("Header has correct text",async ()=>{
    const text = await page.getContentsOf("a.brand-logo");
    expect(text).toEqual("Blogster");
})


// test("click login start oauth flow", async ()=>{
//     // find aotuh link the site 
//     await page.click('.right a');
//     // expect url is to be match
//     const url = await page.url()
//     expect(url).toMatch(/accounts\.google\.com/);
//     // console.log(url);
// });

// to run single test in the file use .only 
test("when signed in shows logout button", async ()=>{
    // login to the account 
    await page.login();
    // get logout text 
    const text = await page.getContentsOf('a[href="/auth/logout"]');
    expect(text).toEqual("Logout");
});


