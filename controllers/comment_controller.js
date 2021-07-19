const Comment = require("../models/comments");
const Post = require("../models/post");

// // check if the post actually exist to which the comment has been given, as it can be hampered by inspect elemnet
// module.exports.createComment = (req, res) => {
//   Post.findById(req.body.post, (err, post) => {
//     if (post) {
//       Comment.create(
//         { content: req.body.content, user: req.user._id, post: req.body.post },
//         (err, comment) => {
//           if (err) {
//             console.log("err in creating comment");
//             return;
//           }
//           post.comments.push(comment);
//           post.save();

//           return res.redirect("back");
//         }
//       );
//     }
//   });
// };

// check if the post actually exist to which the comment has been given, as it can be hampered by inspect elemnet
module.exports.createComment = async (req, res) => {
  try {
    let post = await Post.findById(req.body.post);
    if (post) {
      let comment = await Comment.create({
        content: req.body.content,
        user: req.user._id,
        post: req.body.post,
      });

      post.comments.push(comment);
      post.save();

      return res.redirect("back");
    }
  } catch (err) {
    console.log("err in creating comment");
    return;
  }
};


// module.exports.deletecomment = (req, res) => {
//   Comment.findById(req.params.id)
//   .populate("post")
//   .exec((err, comment) => {
//     console.log(comment.post.user + "-" + req.user._id);
//     if (comment.user == req.user.id || comment.post.user == req.user.id) {
//       let postId = comment.post;

//       comment.remove();

//       Post.findByIdAndUpdate(
//         postId,
//         { $pull: { comments: req.params.id } },
//         (err, post) => {
//           return res.redirect("back");
//         }
//       );
//     } else {
//       return res.redirect("back");
//     }
//   });
// };

module.exports.deletecomment = async (req, res) => {
  try {
    let comment = await Comment.findById(req.params.id).populate("post");
    console.log(comment.post.user + "-" + req.user._id);
    if (comment.user == req.user.id || comment.post.user == req.user.id) {
      let postId = comment.post;
      comment.remove();
       await Post.findByIdAndUpdate(postId, {
        $pull: { comments: req.params.id },
      });
      return res.redirect("back");
    } else {
      return res.redirect("back");
    }
  } catch (err) {
    console.log("err in deleting comment");
    return;
  }
};
