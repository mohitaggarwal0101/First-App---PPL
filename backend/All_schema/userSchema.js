var mongoose = require("mongoose");

var userSchema = mongoose.Schema({

    username:{type:String},

    // age:{type:String},

    // phone:{type:String},

    // address:{type:String},

    password:{type:String},

    email:{type:String},
  
    fname:{type:String},

    lname:{type:String}
    

},{versionKey:false})

module.exports = mongoose.model("userCollection",userSchema)