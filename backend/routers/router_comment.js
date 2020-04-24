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

router.post('/addComment', (req, res) => {

    try {
        api.Addcomment(req.body).then((data) => {
            res.send(req.body);
        })
    }
    catch (err) {
        res.send(err);
    }
})

router.post('/getComments', (req, res) => {
    try {
        api.Getcomments(req.body).then((data) => {

            res.send(data);
        })

    }
    catch (err) {
        res.send(err);
    }
})

router.post('/getlikes', (req, res) => {
    console.log("data for likes __________________",req.body);
    try {
        api.Getlikes(req.body).then((data) => {

            console.log("likes from apiiiiiiiiiiii areeeeeeeee",data);

            res.send({ temp: data[0].likes.length })
        })
    }
    catch (err) {
        res.send(err);
    }
})

router.post('/onlike', (req, res) => {
    try {
        api.Onlike(req.body).then((data) => {

            res.send(data);
        })
    }
    catch (err) {
        res.send(err);
    }
})
module.exports = router;