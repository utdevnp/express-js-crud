const puppeteer = require("puppeteer");

class Customepage{
    // define static function 
    static async build(){
        // create a browser
        const browser = await puppeteer.launch({
            headless:true
        });

        const page  = await browser.page();
        const customePage = new Customepage();
        // create proxy for the combining both to access property of page and custome page in single obj
        return new Proxy(customePage,{
            get: function(target,property){
                return target[property] || page[property] || browser[property];
            }
        });
    }

    constructor(page){
        this.page = page
    }
}

module.exports = Customepage;