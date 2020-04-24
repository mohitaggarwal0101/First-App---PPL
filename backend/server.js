var express = require("express");
var app = express();

var bodyParser = require("body-parser");

var mongoose = require("mongoose");
var cors = require("cors");

// var router = require('./router')

// app.use(app.router);
// routes.initialize(app);

app.use('/myfiles',express.static('public'));

var router_user = require("./routers/router_user");
var router_comment = require("./routers/router_comment");
var router_post = require("./routers/router_post");
var router_category = require("./routers/router_category");

app.use(cors());

app.use(bodyParser.urlencoded({ extended: false }))

app.use(bodyParser.json());

mongoose.connect('mongodb://localhost:27017/nativeDatabase', {
    useNewUrlParser: true,

    useUnifiedTopology: true
});


// app.use("/",router);
app.use("/user",router_user);
app.use("/comment",router_comment);
app.use("/post",router_post)
app.use("/category",router_category)


app.listen(4040, () => {
    console.log("server is running   http://localhost:4040");

})

