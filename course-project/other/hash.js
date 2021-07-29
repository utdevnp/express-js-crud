const bcrypt = require("bcrypt");

async function hashPassword(){
    const salt = await bcrypt.genSalt(10);
    const hash = await bcrypt.hash("12345678",salt);
    console.log("salt: ",salt);
    console.log("pass: ", hash);
}

hashPassword();