var express = require("express");
var router = express.Router();
var api = require('../api');
var fs = require('fs');

var multer = require("multer")

const Storage = multer.diskStorage({
    destination(req, file, callback) { 
        console.log("in multer_______>>>",file);
        //yha nhi aara
      callback(null, '/home/com115/Desktop/MyFirstApp/backend/public')
    },
    filename(req, file, callback) {
        console.log("in multer_______>>>",req.body);
      callback(null, `${file.fieldname}_${Date.now()}_${file.originalname}`)
    },
  })


const upload = multer({ storage: Storage })


router.post("/addCategory",upload.single("image"),function(req,res){

    req.body.thumbnail = req.file.filename;

    console.log("in addCategroy, file is ^^^^^^^^",req.body);

    api.addCategory(req.body).then((data)=>{
      res.send(data);
    })

})

router.post("/getCategories",(req,res)=>{

  api.getCategories().then((data)=>{
    res.send(data);
  })
})

module.exports = router;