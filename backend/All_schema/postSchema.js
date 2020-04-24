var mongoose = require("mongoose");

var postSchema = mongoose.Schema({
    
    postName:{type:String},

    category:{type:String},

    file:{type:String},

    date:{type:String},

    time:{type:String},
    
    email:{type:String},

    username:{type:String},

    likes:{type:Number},

    comments:{type:Number}

},{versionKey:false})

module.exports = mongoose.model("postcollections",postSchema)