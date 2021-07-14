// var Comment = require("../models/comments");

// module.exports.showCommenst = (req, res) => {
//   Comment.find({})
//     .populate("user")
//     .populate("post")
//     .exec((err, comments) => {
//       if (err) {
//         console.log("err in showing showcomments");
//         return;
//       }
//       return res.render("home", { comments: comments });
//     });
// };
