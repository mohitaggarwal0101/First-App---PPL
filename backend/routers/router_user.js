var express = require("express");
var router = express.Router();
var api = require('../api');

// var index =  require("/home/com115/Desktop/MyFirstApp/utils/index");

router.post('/signUp',function(req,res){
    console.log("data before error::::",req.body)
    try
    {
        api.signUp(req.body).then((data)=>{

            res.send(data);
        });
    }
    catch(err){
        res.send(err);
    }
 
    
})

router.post("/login",function(req,res){
    console.log("loginnnnnnnnnnnnnn",req.body);

    try
    {
        api.login(req.body).then((data)=>{

            res.send(data);
        })
    }
    catch(err)
    {
        res.send(err);
    }
})

module.exports = router;