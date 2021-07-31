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
    let post = await Post.create({
      content: req.body.content,
      user: req.user._id,
    });
    

    if (req.xhr) {
      // post = await post.populate("user").execPopulate();
      // if we want to populate just the name of the user (we'll not want to send the password in the API), this is how we do it!
      post = await post.populate('user', 'name').execPopulate();
      res.status(200).json({
        data: {
          post: post,
        },
        message: "Post Created",
      });
    }

    req.flash("success", "Post Created");
    return res.redirect("back");
  } catch (err) {
    req.flash("error", err);
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

      if (req.xhr) {
        res.status(200).json({
          data: {
            post_id: req.params.id,
          },
          message: "Post Deleted",
        });
      }

      req.flash("success", "Post Removed");
      return res.redirect("back");
    } else {
      req.flash("error", "You can't delete this post");
      return res.redirect("back");
    }
  } catch (err) {
    req.flash("error", err);
    return;
  }
};
