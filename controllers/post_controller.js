var Post = require("../models/post");
const Comment = require("../models/comments");

// module.exports.createPost = (req, res) => {
//   Post.create(
//     { content: req.body.content, user: req.user._id },
//     (err, post) => {
//       if (err) {
//         console.log("err in creating");
//         return;
//       }
//       return res.redirect("back");
//     }
//   );
// };

module.exports.createPost = async (req, res) => {
  try {
    await Post.create({ content: req.body.content, user: req.user._id });
    req.flash('success',"Post Created");
    return res.redirect("back");
  } catch (err) {
    req.flash('error',err);
    return;
  }
};

// module.exports.destroy = (req, res) => {
//   Post.findById(req.params.id, (err, post) => {
//     // .id means converting the object id into string
//     if (post.user == req.user.id) {
//       post.remove();
//       Comment.deleteMany({ post: req.params.id }, (err) => {
//         return res.redirect("back");
//       });
//     } else {
//       return res.redirect("back");
//     }
//   });
// };

module.exports.destroy = async (req, res) => {
  try {
    let post = await Post.findById(req.params.id);
    // .id means converting the object id into string
    if (post.user == req.user.id) {
      post.remove();
      await Comment.deleteMany({ post: req.params.id });
      req.flash('success',"Post Removed");
      return res.redirect("back");
    } else {
      req.flash('error',"You can't delete this post");
      return res.redirect("back");
    }
  } catch (err) {
    req.flash('error',err);
    return;
  }
};
