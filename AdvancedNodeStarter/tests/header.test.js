const puppeteer = require("puppeteer");
let browser,page;
beforeEach(async ()=>{
    // if we get given message on test 
    // Timeout - Async callback was not invoked within the 5000ms timeout specified by jest.setTimeout.
    // please set jest timeout 
    jest.setTimeout(10000);

    // create a browser using 'puppeteer'
    browser = await puppeteer.launch({
        headless:false
    });

    // create a page like a new tab
    page = await browser.newPage();
   
    // open our project 
    await page.goto("localhost:3000");
})



afterEach( async ()=>{
    await browser.close();
    jest.clearAllTimers();
})

// check heder test is correct or not 
test("Header has correct text",async ()=>{
    const text = await page.$eval("a.brand-logo", el=>el.innerHTML);
    expect(text).toEqual("Blogster");
})


test("click login start oauth flow", async ()=>{
    // find aotuh link the site 
    await page.click('.right a');

    // expect url is to be match
    const url = await page.url()
    console.log(url);
});

