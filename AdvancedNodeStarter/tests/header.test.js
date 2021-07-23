const puppeteer = require("puppeteer");
let browser,page;
beforeEach(async ()=>{
    // create a browser using 'puppeteer'
    browser = await puppeteer.launch({
        headless:false
    });

    // create a page like a new tab
    page = await browser.newPage();
   
    // open our project 
    await page.goto("localhost:3000");
})

// lunch browser
test("We can lunch browser", async ()=>{
    // find logo text in the site 
    const text = await page.$eval("a.brand-logo", el=>el.innerHTML);
    // expect text is equal to Blogster
    expect(text).toEqual("Blogster");
});