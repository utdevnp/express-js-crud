const requireLogin = require("../middlewares/requireLogin");
const AWS = require("aws-sdk");
const keys = require("../config/keys");
const uuid = require("uuid");
const s3 = new AWS.S3({
    accessKeyId: keys.awsAccessKeyId,
    secretAccessKey: keys.awsSecertAccessKey
})
module.exports = app =>{
    app.get("/api/upload", (req, res)=>{
        const key = `${req.user.id}/${uuid()}.jpg`; // file name 
        s3.getSignedUrl('putObject',{
            Bucket: "my-blog-bucket-123",
            ContentType: "image/jpeg",
            Key:key
        },(err,url)=>{res.send(200).send(key,url)})
    })
}