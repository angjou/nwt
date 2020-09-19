const express = require("express");
const bodyParser = require("body-parser");
const app = express();
const db = require("./queries");
const port = 5000;
var multer = require('multer');
var cors = require('cors');

app.use(cors())
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({
    extended: true,
}))
app.get('/',(req,res)=>{
    res.send('Hello world!')
})

var storage = multer.diskStorage({
    destination: function ( req, file,cb){
        cb(null, 'C:/Users/andel/Desktop/nwt/frontend/mydiary/public/images')
    },
    filename: function(req, file, cb){
        cb(null,file.originalname)
    }
})

var upload = multer ({ storage : storage}).single('file');

app.post('/upload',function(req,res){
    upload(req,res, function (err){
        if (err instanceof multer.MulterError){
            console.log("murter"+err)
            return res.status(500).json(err)
            
        }else if (err){
            console.log("post"+err)
            return res.status(500).json(err)
        }
        return res.status(200).send(req.file)
    })
});


app.get("/api/getStories",db.getStories);
app.post("/api/submitStory",db.submitStory);
app.delete("/api/deleteStory/:story_id",db.deleteStory);
app.post("/api/updateStory/:story_id",db.updateStory)


app.listen(port,()=>{
    console.log("App ");
})