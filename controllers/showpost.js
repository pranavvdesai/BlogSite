var Post = require("../models/post");

// module.exports.showPost = (req,res)=>{
//     Post.find({},(err,posts)=>{
//         if(err){
//             console.log('err in showing');
//             return;
//         }
//         return res.render('home',{posts:posts})
//     })
// }

/* could use this but would show only comments */
// module.exports.showPost = (req, res) => {
//   Post.find({})
//     .populate("user")
//     .populate("comments")
//     .exec((err, posts) => {
//       if (err) {
//         console.log("err in showing");
//         return;
//       }
//       return res.render("home", { posts: posts });
//     });
// };


module.exports.showPost = (req, res) => {
  Post.find({})
    .populate("user")
    // nested population where we populate comments and inside the comments the user of each comments
    .populate({
      path:"comments",
      populate: {
        path:"user"
      }
    })
    .exec((err, posts) => {
      if (err) {
        console.log("err in showing");
        return;
      }
      return res.render("home", { posts: posts });
    });
};

