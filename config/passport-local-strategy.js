const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const User = require('../models/user');

// authenticating using passport
passport.use(
  new LocalStrategy(
    {
      usernameField: 'email',
      passReqToCallback: true
    },
    function (req,email, password, done) {
      User.findOne({ email: email }, (err, user) => {
        if (err) {
          req.flash('error', err);
          return done(err);
        }

        if (!user || user.password != password) {
          req.flash('error', 'Invalid email or password');
          return done(null, false);
        }

        return done(null, user);
      });
    }
  )
);

// serializing to decide which key is to be kept in cookies
passport.serializeUser(function (user, done) {
  done(null, user.id);
});

// deserializing the user from the key in cookies
passport.deserializeUser(function (id, done) {
  User.findById(id, (err, user) => {
    if (err) {
      console.log('error in finding user --> passport');
      return done(err);
    }

    return done(null, user);
  });
});

// check if the user is authenicated
passport.checkAuthentication = (req, res, next) => {
  // if the user is logged in then pass the request to the next function(controller action)
  if (req.isAuthenticated()) {
    return next();
  }
  // if the user is not signed in
  return res.redirect('/register');
};

passport.setAuthenticatedUser = (req, res, next) => {
  if (req.isAuthenticated()) {
    // req.user contains current logged in user from the session cookie and we are sending this to the locals for views
    res.locals.user = req.user;
  }
  next();
};

module.exports = passport;
