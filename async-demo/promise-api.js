// the senerio is , promise result is already resloved 
const p = Promise.resolve({id:1});
p.then((result)=>console.log(result));