const puppeteer = require("puppeteer");


test("Add two numbers ", ()=>{
    const sum = 2+3;
    expect(sum).toEqual(5);
});

// lunch browser
test("We can lunch browser", async ()=>{
    // create a browser using 'puppeteer'
    const browser = await puppeteer.launch({
        headless:false
    });

    // create a page like a new tab
    const page = await browser.newPage();

    // open our project 
    await page.goto("localhost:3000");

});