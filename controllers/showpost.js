var Post = require("../models/post");
const User = require("../models/user");
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

// normal method
// module.exports.showPost = (req, res) => {
//   Post.find({})
//     .populate("user")
//     // nested population where we populate comments and inside the comments the user of each comments
//     .populate({
//       path: "comments",
//       populate: {
//         path: "user",
//       },
//     })
//     .exec((err, posts) => {
//       User.find({}, (err, user) => {
//         return res.render("home", { posts: posts, user_all: user });
//       });
//     });
//   }

// async await method
module.exports.showPost = async (req, res) => {
try{
  // populate the user of each post
  let posts = await Post.find({})
    .populate("user")
    // nested population where we populate comments and inside the comments the user of each comments
    .populate({
      path: "comments",
      populate: {
        path: "user",
      },
    })
    
    let user= await User.find({})
    return res.render("home", { posts: posts, user_all: user });

}
catch(err){
  console.log(err);
  return
}
  
};

