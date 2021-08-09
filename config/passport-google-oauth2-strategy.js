const passport = require("passport");
// const googleStrategy = require("passport-google-oauth2").OAuth2Strategy;
const googleStrategy = require("passport-google-oauth").OAuth2Strategy;
const crypto = require("crypto");
const User = require("../models/user");
const env = require('./environment')

// tell passport to use the google strategy
passport.use(
  new googleStrategy(
    {
      clientID: process.env.CLIENT_ID,
      clientSecret: process.env.CLIENT_SECRET,
      callbackURL: process.env.GOOGLE_CALLBACK_URL,
    },
    (accessToken, refreshToken, profile, done) => {
      // find the user in the database based on their google id
      User.findOne({ email: profile.emails[0].value }).exec((err, user) => {
        if (err) {
          console.log("err in google strategy", err);
          return;
        }
        console.log(profile);
        if (user) {
          // if found , set this user as a req.user
          return done(null, user);
        } else {
          // if not found create the user and set it as req.user
          User.create(
            {
              email: profile.emails[0].value,
              name: profile.displayName,
              password: crypto.randomBytes(20).toString("hex"),
            },
            (err, user) => {
              if (err) {
                console.log("err in google strategy", err);
                return;
              }
              return done(null, user);
            }
          );
        }
      });
    }
  )
);

module.exports = passport;
