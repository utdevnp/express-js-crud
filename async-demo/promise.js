// promise take two parameters 
const p = new Promise((resolve,reject)=>{
    // if response is ok used reslove else reject 
    setTimeout(()=>{
        resolve({id: 1, message:"hello"}); // pending => reslove
        //reject(new Error("message")); // pending to rejected 
    })
    
});

p.then((result)=>console.log("Result",result))
    .catch((error)=>console.log("Error",error.message)) /// error message have a message property