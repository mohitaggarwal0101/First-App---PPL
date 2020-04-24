// var usermodel = require('./All_schema/userSchema2');
// var postSchema = require("./All_schema/postSchema");
// var commentSchema = require("./All_schema/commentSchema");
// var categorySchema = require("./All_schema/categorySchema");

var userSchema = require("./All_schema/userSchema");
var commentSchema = require("./All_schema/commentSchema");
var categorySchema = require("./All_schema/categorySchema");
var postSchema = require("./All_schema/postSchema");

module.exports = {
    signUp: function (data) {
        console.log("apiiiiiiiiiiii",data);

        return new Promise((resolve,reject)=>{
            userSchema.find({email:data.email},(err,result)=>{
                if(err)
                {
                    reject(err);
                }
                else
                {
                    if(result.length === 0)
                    {
                        userSchema.create(data, function (err, result) {
                            if(err)
                            {
                                reject(err);
                            }
                            else
                            {
                                resolve(result);
                            }
                        })
                    }
                    else
                    {
                        resolve({msg:"user exists"});
                    }
                }
            })
        })
    },

    login: function(data){
        return new Promise((resolve,reject)=>{
            userSchema.find({email:data.email,password:data.password},(err,result)=>{
                if(err)
                {
                    reject(err);
                }
                else
                {
                    if(result.length === 0)
                    {
                        resolve({msg:"incorrect info"});
                    }
                    else
                    {
                        resolve(result);
                    }
                }
            })
        })
    },

    uploadPost: function(data){
        return new Promise((resolve,reject)=>{
            postSchema.create(data,(err,result)=>{
                if(err)
                {
                    reject(err);
                }
                else
                {
                    postSchema.find({}, (err, result) => {
                        if (err) {
                            reject(err);
                        }
                        else {
                            resolve(result);
                        }
                    })
                }
            })
        })
    },

    addCategory: function(data){
        return new Promise((resolve,reject)=>{
            console.log("in api of  add category",data);
            categorySchema.find({category: data.category},(err,result)=>{
                if(err)
                {
                    reject(err);
                }
                else
                {
                    if(result.length === 0)
                    {
                        categorySchema.create(data,(err,result)=>{
                            if(err)
                            {
                                reject(err);
                            }
                            else
                            {
                                categorySchema.find({},(err,result)=>{
                                    if(err)
                                    {
                                        reject(err);
                                    }
                                    else
                                    {
                                        console.log("abscent");
                                        resolve(result);
                                    }
                                })
                            }
                        })

                    }
                    else
                    {
                        console.log("present");
                        resolve({msg:"category with this name is already in the list"});
                    }
                }
            })
            // categorySchema.create(data,(err,result)=>{
            //     if(err)
            //     {
            //         reject(err);
            //     }
            //     else
            //     {
            //         categorySchema.find({},(err,result)=>{
            //             if(err)
            //             {
            //                 reject(err);
            //             }
            //             else
            //             {
            //                 resolve(result);
            //             }
            //         })
            //     }
            // })
        })
    },

    getCategories: function(data){
        return new Promise((resolve,reject)=>{
            categorySchema.find({},(err,result)=>{
                if(err)
                {
                    reject(err);
                }
                else
                {
                    resolve(result);
                }
            })
        })
    },

    getPosts: function (data) {
        return new Promise((resolve, reject) => {
            postSchema.find({}, (err, result) => {
                if (err) {
                    reject(err);
                }
                else {
                    resolve(result);
                }
            })
        })
    },

    getSinglePost: function (data) {
        return new Promise((resolve, reject) => {
            postSchema.find({ _id: data.id }, (err, result) => {
                if (err) {
                    reject(err);
                }
                else {
                    resolve(result);
                }
            })
        })
    },

    Getcomments: function (data) {
        return new Promise((resolve, reject) => {
            commentSchema.find({ file: data.singlePost.file }, (err, result) => {
                if (err) {
                    reject(err);
                }
                else {
                    if (result.length === 0) {
                        let obj = {
                            file: data.singlePost.file,
                            commentInfo: [],
                            likes: []
                        }

                        console.log("obj of commmmennnttt isss", obj)

                        commentSchema.create(obj, function (err, result) {
                            if (err) {
                                reject(err);
                            }
                            else {
                                console.log("bxsbsx");

                                console.log("result of creation of obj", result);

                                resolve(result);

                            }
                        })

                    }
                    else {
                        resolve(result[0]);
                    }
                }
            })
        })
    },

    Addcomment: function (data) {
        return new Promise((resolve, reject) => {

            commentSchema.find({ file: data.singlePost.file }, (err, result) => {
                if (err) {
                    reject(err);
                }
                else {
                    if (result.length === 0) {
                        let obj = {
                            file: data.singlePost.file,
                            commentInfo: [{ comments: data.comment, usernames: data.username }]
                        }

                        commentSchema.create(obj, function (err, result) {
                            if (err) {
                                reject(err);
                            }
                            else {
                                postSchema.updateOne({ file: data.singlePost.file }, { $inc: { comments: 1 } }).then((data) => {

                                    resolve(result);
                                })
                            }
                        })

                    }
                    else {
                        console.log("in elseeeeeeee");
                        let obj = {
                            comments: data.comment,
                            usernames: data.username
                        }
                        commentSchema.updateOne({ file: data.singlePost.file }, { $push: { commentInfo: obj } }).then((dataa) => {

                            postSchema.updateOne({ file: data.singlePost.file }, { $inc: { comments: 1 } }).then((data) => {

                                console.log("data created");

                                resolve(result)
                            })

                        })

                    }

                }
            })
        })
    },

    Onlike: function (data) {
        console.log("in api onlike----",data);
        return new Promise((resolve, reject) => {
            commentSchema.find({ file: data.file, likes: { $in: [data.email] } }, (err, result) => {
                if (err) {
                    reject(err);
                }
                else {
                    if (result.length) {
                        commentSchema.updateOne({ file: data.file }, { $pull: { likes: data.email } }).then((dataa) => {
                            console.log("cnvfk");

                            postSchema.updateOne({ file: data.file }, { $inc: { likes: -1 } }).then(() => {

                                commentSchema.find({ file: data.file }, (err, result) => {
                                    if (err) {
                                        reject(err);
                                    }
                                    else {
                                        resolve(result);
                                    }
                                })
                            })
                        })
                    }
                    else {
                        commentSchema.updateOne({ file: data.file }, { $push: { likes: data.email } }).then((dataa) => {
                            console.log("scnjnsc");

                            postSchema.updateOne({ file: data.file }, { $inc: { likes: 1 } }).then((dataa) => {

                                commentSchema.find({ file: data.file }, (err, result) => {
                                    if (err) {
                                        reject(err);
                                    }
                                    else {
                                        resolve(result);
                                    }
                                })
                            })
                        })
                    }

                }
            })
        })
    },

    getMyPosts: function (data) {
        return new Promise((resolve, reject) => {
            postSchema.find({ email: data.email }, (err, result) => {
                if (err) {
                    reject(err);
                }
                else {
                    resolve(result);
                }
            })
        })
    },
}


// module.exports = {
//     userFind: function (data) {
//         console.log("in api ++++++", data);

//         return new Promise((resolve, reject) => {
//             usermodel.find({ email: data.email }, function (err, result) {
//                 if (err) {
//                     reject(err);
//                 }
//                 else {
//                     console.log("in userfind!!!!!!", result);
//                     resolve(result);
//                 }
//             })
//         })
//     },

//     userCreate: function (data) {
//         return new Promise((resolve, reject) => {

//             console.log("created#######", data)
//             usermodel.create(data, function (err, result) {
//                 if (err) {
//                     reject(err)
//                 }
//                 else {
//                     resolve("data inserted");
//                 }
//             });
//         })
//     },

//     login: function (data) {
//         return new Promise((resolve, reject) => {
//             console.log("user is =======", data.email)
//             usermodel.find({ email: data.email }, (err, result) => {
//                 if (err) {
//                     console.log("err", err)
//                     reject(err);
//                 }
//                 else {
//                     console.log("result", result)
//                     resolve(result);
//                 }
//             })
//         })
//     },

//     Upload: function (data) {
//         return new Promise((resolve, reject) => {
//             postSchema.create(data, (err, result) => {
//                 // console.log(" creating in database.................................. ")

//                 if (err) {
//                     reject(err);
//                 }
//                 else {
//                     console.log("result is:", result);

//                     resolve(result);
//                 }

//             });
//         })
//     },

    // myPosts: function (data) {
    //     return new Promise((resolve, reject) => {
    //         postSchema.find({ email: data.email }, (err, result) => {
    //             if (err) {
    //                 reject(err);
    //             }
    //             else {
    //                 resolve(result);
    //             }
    //         })
    //     })
    // },

    // Getlikes: function (data) {
    //     return new Promise((resolve, reject) => {
    //         commentSchema.find({ file: data.file }, (err, result) => {
    //             if (err) {
    //                 reject(err);
    //             }
    //             else {
    //                 resolve(result);
    //             }
    //         })
    //     })
    // },

//     Allposts: function (data) {
//         return new Promise((resolve, reject) => {
//             postSchema.find({}, (err, result) => {
//                 if (err) {
//                     reject(err);
//                 }
//                 else {
//                     resolve(result);
//                 }
//             })
//         })
//     },

//     Single: function (data) {
//         return new Promise((resolve, reject) => {
//             postSchema.find({ _id: data.id }, (err, result) => {
//                 if (err) {
//                     reject(err);
//                 }
//                 else {
//                     resolve(result);
//                 }
//             })
//         })
//     },

//     Diffposts: function (data) {
//         return new Promise((resolve, reject) => {
//             postSchema.find({ category: data.cat }, (err, result) => {

//                 if (err) {
//                     reject(err);
//                 }
//                 else {
//                     resolve(result);
//                 }
//             })
//         })
//     },

//     Getcategories: function (data) {
//         return new Promise((resolve, reject) => {
//             categorySchema.find({}, (err, result) => {
//                 if (err) {
//                     reject(err);
//                 }
//                 else {
//                     resolve(result);
//                 }
//             })
//         })
//     },

//     Addcategory: function (data) {
//         return new Promise((resolve, reject) => {
//             categorySchema.create(data, (err, result) => {
//                 if (err) {
//                     reject(err);
//                 }
//                 else {
//                     categorySchema.find({}).then((data) => {

//                         resolve(data);
//                     })
//                 }
//             })
//         })
//     },

    // Addcomment: function (data) {
    //     return new Promise((resolve, reject) => {

    //         commentSchema.find({ file: data.single.file }, (err, result) => {
    //             if (err) {
    //                 reject(err);
    //             }
    //             else {
    //                 if (result.length === 0) {
    //                     let obj = {
    //                         file: data.single.file,
    //                         commentInfo: [{ comments: data.comment, usernames: data.username }]
    //                     }

    //                     commentSchema.create(obj, function (err, result) {
    //                         if (err) {
    //                             reject(err);
    //                         }
    //                         else {
    //                             postSchema.updateOne({ file: data.single.file }, { $inc: { comments: 1 } }).then((data) => {

    //                                 resolve(result);
    //                             })
    //                         }
    //                     })

    //                 }
    //                 else {
    //                     console.log("in elseeeeeeee");
    //                     let obj = {
    //                         comments: data.comment,
    //                         usernames: data.username
    //                     }
    //                     commentSchema.updateOne({ file: data.single.file }, { $push: { commentInfo: obj } }).then((dataa) => {

    //                         postSchema.updateOne({ file: data.single.file }, { $inc: { comments: 1 } }).then((data) => {

    //                             console.log("data created");

    //                             resolve(result)
    //                         })

    //                     })

    //                 }

    //             }
    //         })
    //     })
    // },

    // Getcomments: function (data) {
    //     return new Promise((resolve, reject) => {
    //         commentSchema.find({ file: data.single.file }, (err, result) => {
    //             if (err) {
    //                 reject(err);
    //             }
    //             else {
    //                 if (result.length === 0) {
    //                     let obj = {
    //                         file: data.single.file,
    //                         commentInfo: [],
    //                         likes: []
    //                     }

    //                     console.log("obj of commmmennnttt isss", obj)

    //                     commentSchema.create(obj, function (err, result) {
    //                         if (err) {
    //                             reject(err);
    //                         }
    //                         else {
    //                             console.log("bxsbsx");

    //                             console.log("result of creation of obj", result);

    //                             resolve(result);

    //                         }
    //                     })

    //                 }
    //                 else {
    //                     resolve(result[0]);
    //                 }
    //             }
    //         })
    //     })
    // },

    // Onlike: function (data) {
    //     return new Promise((resolve, reject) => {
    //         commentSchema.find({ file: data.file, likes: { $in: [data.email] } }, (err, result) => {
    //             if (err) {
    //                 reject(err);
    //             }
    //             else {
    //                 if (result.length) {
    //                     commentSchema.updateOne({ file: data.file }, { $pull: { likes: data.email } }).then((dataa) => {
    //                         console.log("cnvfk");

    //                         postSchema.updateOne({ file: data.file }, { $inc: { likes: -1 } }).then((data) => {

    //                             resolve(result);
    //                         })
    //                     })
    //                 }
    //                 else {
    //                     commentSchema.updateOne({ file: data.file }, { $push: { likes: data.email } }).then((dataa) => {
    //                         console.log("scnjnsc");

    //                         postSchema.updateOne({ file: data.file }, { $inc: { likes: 1 } }).then((dataa) => {

    //                             resolve(result);
    //                         })
    //                     })
    //                 }

    //             }
    //         })
    //     })
    // },

//     changeUsername :function(data){
//         return new Promise((resolve,reject)=>{

//             console.log("in api username:::::",data);

//             usermodel.updateOne({email:data.email},{$set:{username:data.username}},(err,result)=>{
//                 if(err)
//                 {
//                     reject(err);
//                 }
//                 else
//                 {
//                     postSchema.updateMany({email:data.email},{$set:{username:data.username}},(err,result)=>{
//                         if(err)
//                         {
//                             reject(err);
//                         }
//                         else
//                         {
//                             resolve(result);
//                         }
//                     })
//                     // resolve(result);
//                 }
//             })
//         })
//     }
// }