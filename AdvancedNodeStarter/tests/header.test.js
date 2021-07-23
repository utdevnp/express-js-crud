const puppeteer = require("puppeteer");
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
    // get user id from db
    const user_id = "60f7e9aa6cad302a7c91b504";
    // require the buffer for generate session key
    const Buffer = require("buffer").Buffer;
    const sessionObj = {
        passport:{
            user:user_id // save object
        }
    };
    // make session object base64 as a string using stringify 
    const sessionString = Buffer.from(
        JSON.stringify(sessionObj)
    ).toString("base64");
    
    // import keygrip , use for generate sugneture and sign
    const Keygrip = require("keygrip");
    const keys = require("../config/keys"); // import cookieKey form config file
    const keygrip = new Keygrip([keys.cookieKey]);
    // generate session signeture and store in signeture
    const signeture = keygrip.sign("session="+sessionString);

    //console.log(sessionString , signeture);

    // set the cookie in the browser 
    await page.setCookie({name:"session",value:sessionString});
    await page.setCookie({name:"session.sig",value:signeture});

    await page.goto("localhost:3000");
    await page.waitFor('a[href="/auth/logout"]');
    // get logout text 
    const text = await page.$eval('a[href="/auth/logout"]', el=>el.innerHTML);
    expect(text).toEqual("Logout");
});


