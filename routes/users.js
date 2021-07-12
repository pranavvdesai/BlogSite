const express = require('express');
const router = express.Router();
const passport = require('passport')


const usersController = require('../controllers/users_controller')
const postController = require('../controllers/post_controller')



router.post('/postcreate',passport.checkAuthentication,postController.createPost)


router.get('/profile',passport.checkAuthentication,usersController.profile)

module.exports = router;




