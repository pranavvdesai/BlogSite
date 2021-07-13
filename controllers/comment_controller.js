var Comment = require('../models/comments')


module.exports.createComment = (req,res)=>{
    Comment.create({content: req.body.content,user: req.user._id,post: req.post._id},(err,post)=>{
        if (err) {
            console.log('err in creating comment');
            return;
          }
        return res.redirect('back')
    })
}
