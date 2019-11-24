const passport = require('passport');
const GoogleStrategy = require('passport-google-oauth20').Strategy;
const keys = require('../config/keys');
// model
const mongoose = require('mongoose');
const User = mongoose.model("users");

passport.serializeUser((user, done) => {
    done(null, user.id)
});

passport.deserializeUser((id, done) => {
    User.findById(id).then((user) => {
        done(null, user)
    });
});

passport.use('google', new GoogleStrategy({
    clientID: keys.clientID,
    clientSecret: keys.clientSecret,
    callbackURL: "/auth/google/callback/"
}, async (accessToken, refreshToken, profile, done) => {
    console.log("profile", profile.id);
    await User.findOne({ googleID: profile.id })
            .then((exitingUser) => {
                if (exitingUser) {
                    done(null, exitingUser);
                } else {
                    new User({ googleID: profile.id }).save()
                    .then((user) => {
                        done(null, user);
                    })
                }
            })
}));