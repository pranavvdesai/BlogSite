// passport.authenticate('jwt'), this folder extracts the jwt token from the requests the user sends and finds in db


const passport = require('passport');
const passportJwtStrategy = require('passport-jwt').Strategy;
const ExtractJWT = require('passport-jwt').ExtractJwt;
const User = require('../models/user');

let opts = {
    // header --> list of keys having a key called authorization --> list of keys having bearer which contains jwttoken
    jwtFromRequest : ExtractJWT.fromAuthHeaderAsBearerToken(),
    secretOrKey : 'pronob'
}

passport.use(new passportJwtStrategy(opts, (jwt_payload, done) => {
    User.findOne({
        _id: jwt_payload._id 
    }, (err, user) => {
        if (err) {
            console.log("err in finding user from jwt");
            return 
        }
        if (!user) {
            return done(null, false);
        }
        return done(null, user);
    });
}
));

module.exports = passport;