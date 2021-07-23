// old Implementation  usong callback
// getCustomer(1,(customer)=>{
//     console.log(customer);
//     if(customer.isGold){
//         gettopMovies((topmovies)=>{
//             console.log(topmovies);
//             sentEmail(customer.email,(emailsent)=>{
//                 console.log(emailsent);
//             })
//         })
//     }
// });


// new implementation using async and await 

async function notifyCustomer(){
    try{
        const customer = await getCustomer(1);
        console.log(customer);
        if(customer.isGold){
            const movies = await gettopMovies();
            console.log(movies);
            const sentemail = await sentEmail(customer.email,movies);
            console.log(sentemail);
        }else{
            console.log("Gold customer are not found ....");
        }
    }catch(err){
        console.log("Error",err.message);
    }
    
}

notifyCustomer();



function getCustomer(id){
    return new Promise((reslove,reject)=>{
        setTimeout(() => {
            reslove({
                id:1,
                name:"UtDev",
                email:"utdevnp@gmail.com",
                isGold:true,
            });
        }, 2000);
    })

}

function gettopMovies(){
    return new Promise((reslove,reject)=>{
        setTimeout(() => {
            reslove(["movies1","movies2"]);
        }, 2000);
    })
   
}

function sentEmail(useremail,movies){
    return new Promise((reslove,reject)=>{
        setTimeout(() => {
            reslove(`email sent to ${useremail}...`);
        }, 2000);
    })
   
}