const passport = require("passport");
// const googleStrategy = require("passport-google-oauth2").OAuth2Strategy;
const googleStrategy = require("passport-google-oauth").OAuth2Strategy;
const crypto = require("crypto");
const User = require("../models/user");

// tell passport to use the google strategy
passport.use(
  new googleStrategy(
    {
      clientID:
        "429877536839-5vvdb4ikjq04cc9a6ojoa5ntek6sb3rl.apps.googleusercontent.com",
      clientSecret: "dvq33rumXRGwcSuxT7fJ3rhy",
      callbackURL: "http://localhost:8000/auth/google/callback",
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
