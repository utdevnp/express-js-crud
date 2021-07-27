const mongoose  = require("mongoose");
const redis = require("redis");
const util = require("util");
const keys = require("../config/keys");
// create redis server and change callback to promise

const client = redis.createClient(keys.redisUrl);
client.hget = util.promisify(client.hget);

const exec = mongoose.Query.prototype.exec;

// add the cache function in our query ( mongoose.Query.prototype)
mongoose.Query.prototype.cache = function(options = {}){
    this.useCache = true;
    this.hashKey = JSON.stringify(options.key) || "";
    return this; // make chainable property
}

mongoose.Query.prototype.exec = async function(){

    // check if cache enable in query or not
    if(!this.useCache){

        console.log("SERVING FROM DIRECT DB SYSTEM ...",this.mongooseCollection.name);

        return exec.apply(this,arguments);
    }

    console.log("SERVING FROM CACHE SYSTEM ...",this.mongooseCollection.name);
    // console.log("I AM ABOUT TO RUN QUERY");
    // console.log(this.getQuery());
    // console.log(this.mongooseCollection.name);

    // to make the unique key for redis 
    const key = JSON.stringify(Object.assign({},this.getQuery(),{
        collection: this.mongooseCollection.name
    }));
    // Do we have any cached data in redis related
    // to this query

    const cacheValue = await client.hget(this.hashKey, key);

    // if , yes respond the request and return it 
    if(cacheValue){

        const doc = JSON.parse(cacheValue);
        // dealing with array and object
        return Array.isArray(doc)
            ? doc.map(d=> new this.model(d)) // if data is array
            : new this.model(doc) // else data is single object 
    }
    //  if no we need to respond to the request
    // and update our cache to store the data 

    const result = await exec.apply(this,arguments);

    // set the data in redis, update our cache to store the data 
    client.hset(this.hashKey,key,JSON.stringify(result));

    return result;
};


module.exports  = {

    clearHash(hashkey){
        client.del(JSON.stringify(hashkey))
    }

}

// // print request id 
    // console.log("UserID:",req.user.id);
    // // define redis
    // const redis = require("redis");
    // const redisUrl = 'redis://localhost:6379';
    // const client = redis.createClient(redisUrl);

    // const util  = require("util");
    // client.get = util.promisify(client.get);

    // // Do we have any cached data in redis related
    // // to this query
    // const cachedBlog = await client.get(req.user.id);

    // // if , yes respond the request and return it 
    // if(cachedBlog){
    //   console.log("SERVING FROM CACHE ...");
    //   return res.send(JSON.parse(cachedBlog));
    // }
    // if no we need to respond to the request
    // and update our cache to store the data 

        // set the key and valur for this next cache 
    //client.set(req.user.id,JSON.stringify(blogs));
