
/*
Rewrite this code using async and await
*/

getCustomer(1,(customer)=>{
    console.log(customer);
    if(customer.isGold){
        gettopMovies((topmovies)=>{
            console.log(topmovies);
            sentEmail(customer.email,(emailsent)=>{
                console.log(emailsent);
            })
        })
    }
});

function getCustomer(id,callback){
    setTimeout(()=>{
        callback({
            id:1,
            email:"utdevnp@gmail.com",
            isGold:true,
            active:true
        },2000)
    })
}

function gettopMovies(callback){
    setTimeout(()=>{
        callback(["movies1","movies2"]);
    },2000)
}

function sentEmail(useremail,callback){
    setTimeout(() => {
        callback("email sent ...");
    }, 2000);
}