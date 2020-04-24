var express = require("express");
var router = express.Router();
var api = require('../api');
var fs = require('fs');

var multer = require("multer")

const Storage = multer.diskStorage({
    destination(req, file, callback) { 
        console.log("in multer_______>>>",file);
        //yha nhi aara
      callback(null, '/home/com115/Desktop/MyFirstApp/backend/public/')
    },
    filename(req, file, callback) {
        console.log("in multer_______>>>",req.body);
      callback(null, `${file.fieldname}_${Date.now()}_${file.originalname}`)
    },
  })


const upload = multer({ storage: Storage })


router.post("/uploadPost",upload.single("fileData"),function(req,res){
    
        // console.log("in upload Post^^^^^^^^",req.body);

        var dat = new Date();
        req.body.date = dat.toString().slice(8, 10) + " " + dat.toString().slice(4, 7) + " " + dat.toString().slice(11, 15);
        req.body.time = dat.toString().slice(16, 24);
        req.body.file = req.file.filename

        console.log("in upload Post again^^^^^^^^",req.body);

        api.uploadPost(req.body).then((data)=>{
          
          res.send(data);
        })
    
})

router.post("/getPosts",(req,res)=>{

  api.getPosts().then((data)=>{
    res.send(data);
  })
})

router.post("/getSinglePost",(req,res)=>{

  api.getSinglePost(req.body).then((data)=>{
    res.send(data);
  })
})

router.post("/myPosts",(req,res)=>{

  api.getMyPosts(req.body).then((data)=>{
    res.send(data);
  })
})


// req.file
// router.post('/addComment', (req, res) => {

//     try {
//         api.Addcomment(req.body).then((data) => {
//             res.send(req.body);
//         })
//     }
//     catch (err) {
//         res.send(err);
//     }
// })

// router.post('/getComments', (req, res) => {
//     try {
//         api.Getcomments(req.body).then((data) => {

//             res.send(data);
//         })

//     }
//     catch (err) {
//         res.send(err);
//     }
// })

// router.post('/getlikes', (req, res) => {
//     console.log("data for likes __________________",req.body);
//     try {
//         api.Getlikes(req.body).then((data) => {

//             console.log("likes from apiiiiiiiiiiii areeeeeeeee",data);

//             res.send({ temp: data[0].likes.length })
//         })
//     }
//     catch (err) {
//         res.send(err);
//     }
// })

// router.post('/onlike', (req, res) => {
//     try {
//         api.Onlike(req.body).then((data) => {

//             res.send(data);
//         })
//     }
//     catch (err) {
//         res.send(err);
//     }
// })
module.exports = router;