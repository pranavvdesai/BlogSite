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

module.exports.showPost = (req, res) => {
  Post.find({})
    .populate("user")
    .exec((err, posts) => {
      if (err) {
        console.log("err in showing");
        return;
      }
      return res.render("home", { posts: posts });
    });
};
