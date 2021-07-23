console.log("Before");
getUser((user)=>{
    console.log(user);
    getGitRepo(user.githubUserName, (repos)=>{
        console.log(repos);
    })
});
console.log("After");

// javascript asynchronous behavior
// 1. callbacks
// 2. Promises
// 3. Await


function getUser(callback){
    setTimeout(()=>{
        console.log("Reading from database");
        callback({id:"1",githubUserName:"@utdevnp"});
    },2000)
}


function getGitRepo(username,callback){
    setTimeout(()=>{
        console.log("Fetching github api ...");
        callback(['repo1',"repo2"]);
    },2000)
}