const passport = require('passport');
const GoogleStrategy = require('passport-google-oauth20').Strategy;
const keys = require('../config/keys');

passport.use('google', new GoogleStrategy({
    clientID: keys.clientID,
    clientSecret: keys.clientSecret,
    callbackURL: "/auth/google/callback/"
}, (accessToken, refreshToken, profile, done) => {
    console.log("access token", accessToken);
    console.log("access token", refreshToken);
    console.log("access token", profile);
}));