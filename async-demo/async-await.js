// await is decorated by the async 
// aslo we dont have catch method on this async and await , so we used try catch block 
// for error catchig 
async function displayUser(){
    try{
        const user = await getUser(1);
        console.log(user.id);
    }catch(err){
        console.log(err.message);
    }
   
}
displayUser() // call the function 



function getUser(id){
    return new Promise((reslove,reject)=>{
        setTimeout(()=>{
            reslove({id:id});
//reject(new Error("User id not found ..."));
        },2000)
    })
}