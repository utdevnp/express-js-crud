# AdvancedNodeStarter
Starting project for a course on Advanced Node @ Udemy

## Set the redis client 
<pre>
    # Open your terminal and run command 'node' then ...

    # require redis 
    const redis = require("redis")

    # set redis url 
    const redisUrl = 'redis://localhost:6379'

    # create the client in given url 
    const client = redis.createClient(redisUrl)

    # check client created or not
    client

    # set data to client basic 
    client.set('hi','there')

    # get data to client basic
    client.get('hi',(err,value)=>console.log(value))

    #set using hash hset
    client.set("nepali","red", "rato")

    #get using hash hget
    client.hget("nepali","red", console.log)
    client.hget("nepali","red", (err,value)=>console.log(value)) // using callback 

    # set  simple object 
    client.set("colors",JSON.stringify({red:'rojo'}))

    # get simple object
    client.get("colors",(err,value)=>console.log(JSON.parse(value)))
    OR 
    client.get("colors",(err,value)=>console.log(value))

    # set data with expire time in seconds
    client.set("colors",JSON.stringify({rato:"red"},"EX",5))

    # Clear all redis cache 
    client.flushall()
</pre>