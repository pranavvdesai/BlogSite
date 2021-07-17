const Comment = require("../models/comments");
const Post = require("../models/post");

// check if the post actually exist to which the comment has been given, as it can be hampered by inspect elemnet
module.exports.createComment = (req, res) => {
  Post.findById(req.body.post, (err, post) => {
    if (post) {
      Comment.create(
        { content: req.body.content, user: req.user._id, post: req.body.post },
        (err, comment) => {
          if (err) {
            console.log("err in creating comment");
            return;
          }
          post.comments.push(comment);
          post.save();

          return res.redirect("back");
        }
      );
    }
  });
};

module.exports.deletecomment = (req, res) => {
  Comment.findById(req.params.id, (err, comment) => {
    if (comment.user == req.user.id || comment.post.user == req.user._id) {
      let postId = comment.post;

      comment.remove();

      Post.findByIdAndUpdate(
        postId,
        { $pull: { comments: req.params.id } },
        (err, post) => {
          return res.redirect("back");
        }
      );
    } else {
      return res.redirect("back");
    }
  });
};
