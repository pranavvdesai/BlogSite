var Post = require('../models/post')

module.exports.showPost = (req,res)=>{
    Post.find({},(err,posts)=>{
        if(err){
            console.log('err in showing');
            return;
        }
        return res.render('home.ejs',posts=posts)
    })
}