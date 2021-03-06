const Comment = require("../models/comments");
const Post = require("../models/post");
const commentsMailer = require("../mailers/comments-mailer");
const commentEmailWorker = require("../workers/comment_email_worker");
const queue = require("../config/kue");

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
      comment = await comment.populate('user', 'name email').execPopulate();
      // commentsMailer.newComment(comment);
      // every task u put into queue is a job
      let job = queue.create('emails-queue', comment).save(function(err) {
        if (err) {
          console.log("err in creating queue");
          return;
          }
          console.log(job.id)
          
        });
    

          
      if (req.xhr) {

        res.status(200).json({
          data: {
            comment: comment,
          },
          message: "Comment successfully created",
        });
      }

      req.flash("success", "Comment successfully added");

      return res.redirect("back");
    }
  } catch (err) {
    req.flash("error", "Error while adding comment");
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
      req.flash("success", "Comment successfully deleted");
      await Post.findByIdAndUpdate(postId, {
        $pull: { comments: req.params.id },
      });
      if (req.xhr) {
        res.status(200).json({
          data: {
            comment_id: req.params.id,
          },
          message: "Comment Deleted",
        });
      }

      return res.redirect("back");
    } else {
      req.flash("error", "You don't have permission to delete this comment");
      return res.redirect("back");
    }
  } catch (err) {
    req.flash("error", "Error while deleting comment");
    return;
  }
};
