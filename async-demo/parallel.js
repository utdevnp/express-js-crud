const p1 = new Promise((reslove,reject)=>{
    setTimeout(()=>{
        console.log("calling api of facebook ....");
        //reslove(1);
        reject(new Error("somthing went wrong ......"));
    },2000)
});

const p2 = new Promise((reslove)=>{
    setTimeout(()=>{
        console.log("calling api of twitter ....");
        reslove(2);
    },2000)
})

// run the promise parallel
// if one of the promise is rejected the whole operation is rejected
Promise.all([p1,p2])
    .then((result)=>console.log(result))
    .catch((error)=>console.log(error.message));