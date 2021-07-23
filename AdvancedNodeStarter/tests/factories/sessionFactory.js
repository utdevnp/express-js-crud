 // require the buffer for generate session key
const Buffer = require("buffer").Buffer;

// import keygrip , use for generate sugneture and sign
const Keygrip = require("keygrip");
const keys = require("../../config/keys"); // import cookieKey form config file
const keygrip = new Keygrip([keys.cookieKey]);

module.exports  = (user)=>{
    
    const sessionObj = {
        passport:{
            user:user._id.toString() // save object (toString is used to convert js object to strinng)
        }
    };
    // make session object base64 as a string using stringify 
    const session = Buffer.from(
        JSON.stringify(sessionObj)
    ).toString("base64");

    // generate session signeture and store in signeture
    const signeture = keygrip.sign("session="+session);
    
    //console.log(session , signeture);

    return {session, signeture}; // es6 format return {session:session, signeture:signeture}
}