console.log("Before");
getUser().then((result)=>console.log(result))
.catch((error)=>console.log("error",error.message));
console.log("After");

// javascript asynchronous behavior
// 1. callbacks
// 2. Promises
// 3. Await


function getUser(){
    return new Promise((reslove,reject)=>{
        setTimeout(()=>{
            console.log("Reading from database");
            reslove({id:"1",githubUserName:"@utdevnp"});
            reject(new Error("error message"));
        },2000)
    })
    
}
