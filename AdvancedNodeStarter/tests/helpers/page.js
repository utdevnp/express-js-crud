const puppeteer = require("puppeteer");

class Custompage{
    // define static function 
    static async build(){
        // create a browser using 'puppeteer'
        const browser = await puppeteer.launch({
            headless:false
        });
         // create a page like a new tab
        const page  = await browser.newPage();
        const customPage = new Custompage();
        // create proxy for the combining both to access property of page and custome page in single obj
        return new Proxy(customPage,{
            get: function(target,property){
                return target[property] || browser[property] || page[property];
            }
        });
    }

    constructor(page,browser){
        this.page = page;
        this.browser = browser;
    }

    // alternet method
    // close(){
    //     this.browser.close();
    // }
}

module.exports = Custompage;