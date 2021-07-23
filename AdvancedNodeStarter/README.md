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

## Extract session value from callback
<pre>
    # get the value from response network request eg :  eyJwYXNzcG9ydCI6eyJ1c2VyIjoiNjBmN2U5YWE2Y2FkMzAyYTdjOTFiNTA0In19

    # define value // this is base64 value 
    const session = "eyJwYXNzcG9ydCI6eyJ1c2VyIjoiNjBmN2U5YWE2Y2FkMzAyYTdjOTFiNTA0In19"

    # import buffer package 
    const Buffer = require("safe-buffer").Buffer

    # extract actual value from base64 code 
    Buffer.from(session,'base64').toString('utf8')
        Eg:'{"passport":{"user":"60f7e9aa6cad302a7c91b504"}}'
</pre>

## Session signeture 
<pre>
    Session + Cookie signing key = Session Signeture 

    # Generate the session signeture 

    ## Define session key
    const session = "eyJwYXNzcG9ydCI6eyJ1c2VyIjoiNjBmN2U5YWE2Y2FkMzAyYTdjOTFiNTA0In19"

    ## require / import keygrip package 
    const Keygrip  = require("keygrip")

    ## make set cookie key in keygrip
    const keygrip  = new Keygrip(['123123123']) // this key is developer cookie key 

    ## sign session with cookie key 
    keygrip.sign("session=" + session)
        Eg: XxzJ1q8Z4JFg6C92YWSAKWj7SFk (Generated signeture)

    ## VERIFY Session signeture  (XxzJ1q8Z4JFg6C92YWSAKWj7SFk is a generated signeture above)
    keygrip.verify("session=" + session, 'XxzJ1q8Z4JFg6C92YWSAKWj7SFk')
</pre>