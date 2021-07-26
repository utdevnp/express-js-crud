const puppeteer = require("puppeteer");
const sessionFactory = require("../factories/sessionFactory");
const userFactory = require("../factories/userFactory");

class CustomPage{
    // define static function 
    static async build(){
        // create a browser using 'puppeteer'
        const browser = await puppeteer.launch({
            headless:false
        });
         // create a page like a new tab
        const page  = await browser.newPage();
        const customPage = new CustomPage(page); // pass the page for proxy
        // create proxy for the combining both to access property of page and custome page in single obj
        return new Proxy(customPage,{
            get: function(target,property){ // set 
                return target[property] || browser[property] || page[property];
            }
        });
    }

    constructor(page){
        this.page = page;
        ///console.log(page);
    }


     async login (){
        // make new user from userFactory
        const user = await userFactory();
        // pass the user model to sessionFactory and generate the session keys , signeture
        const {session,signeture} = sessionFactory(user);

        // set the cookie in the browser 
        await this.page.setCookie({name:"session",value:session});
        await this.page.setCookie({name:"session.sig",value:signeture});

        await this.page.goto("localhost:3000/blogs");
        await this.page.waitFor('a[href="/auth/logout"]');
    }

    async getContentsOf(selector){
        return this.page.$eval(selector, el=> el.innerHTML);
    }

    get(path){
        return this.page.evaluate(
            (_path)=>{
                return fetch(_path,{
                    method: "GET",
                    credentials: "same-origin",
                    headers: {
                        'Content-Type': "application/json"
                    }
                }).then(res => res.json())
            },path
        );
    }

    post(path,data){
        return this.page.evaluate(
            (_path,_data)=>{
                return fetch(_path,{
                    method: "POST",
                    credentials: "same-origin",
                    headers: {
                        'Content-Type': "application/json"
                    },
                    body:JSON.stringify(_data)
                }).then(res => res.json())
            },path,data
        );
    }

}

module.exports = CustomPage;