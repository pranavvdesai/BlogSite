const express = require('express');
const router = express.Router();
const passport = require('passport')

const homeController = require('../controllers/home_controller')
const postscontroller = require('../controllers/showpost')
const nth = require('../controllers/nth')

router.get('/register',homeController.register)
router.post('/create',homeController.create)

router.get('/login',homeController.login)
router.get('/',postscontroller.showPost)

router.post('/create-session', passport.authenticate('local',{failureRedirect: '/'}), homeController.loginvalidation)

router.get('/nth',passport.checkAuthentication,nth.nth)
router.use('/users', require('./users'))

router.use('/api', require('./api'))

router.use('/logout',homeController.logout)

module.exports = router;