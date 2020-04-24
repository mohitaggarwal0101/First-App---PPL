var mongoose = require("mongoose");

var commentSchema = mongoose.Schema({

    file:{type:String},
    
    // comments:{type:Array},

    // usernames:{type:Array},

    commentInfo:{type:Array},

    likes:{type:Array}

},{versionKey:false})

module.exports = mongoose.model("commentCollection",commentSchema)