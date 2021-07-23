const puppeteer = require("puppeteer");
const sessionFactory = require("./factories/sessionFactory");
const userFactory = require("./factories/userFactory");


let browser,page;
beforeEach(async ()=>{
    // if we get given message on test 
    // Timeout - Async callback was not invoked within the 5000ms timeout specified by jest.setTimeout.
    // please set jest timeout 
    jest.setTimeout(15000);

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
    await browser.close()
    //jest.clearAllTimers();
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
    expect(url).toMatch(/accounts\.google\.com/)
    // console.log(url);
});

// to run single test in the file use .only 
test("when signed in shows logout button", async ()=>{
   
    // make new user from userFactory
    const user = await userFactory();
    // pass the user model to sessionFactory and generate the session keys , signeture
    const {session,signeture} = sessionFactory(user);

    // set the cookie in the browser 
    await page.setCookie({name:"session",value:session});
    await page.setCookie({name:"session.sig",value:signeture});

    await page.goto("localhost:3000");
    await page.waitFor('a[href="/auth/logout"]');
    // get logout text 
    const text = await page.$eval('a[href="/auth/logout"]', el=>el.innerHTML);
    expect(text).toEqual("Logout");
});


