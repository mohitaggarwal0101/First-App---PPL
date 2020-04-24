var mongoose = require("mongoose");

var categorySchema = mongoose.Schema({
    
    category:{type:String},

    thumbnail:{type:String}

    

},{versionKey:false})

module.exports = mongoose.model("categoryCollection",categorySchema)