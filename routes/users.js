const express = require('express');
const router = express.Router();
const passport = require('passport')


const usersController = require('../controllers/users_controller')

router.get('/profile',passport.checkAuthentication,usersController.profile)

module.exports = router;




