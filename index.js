const express = require('express');
const passport = require('passport');
const mongoose = require('mongoose');
const cookieSession = require('cookie-session');
const app = express();
const keys = require('./src/config/keys');

// server port
const port = process.env.PORT || 5000;
// connect mongoose
mongoose.connect('mongodb://localhost:27017/mongo-oauth-test', () => {
    console.log("connected to mongo");
});
app.use(
    cookieSession({
        maxAge: 30 * 24 * 60 * 60 * 1000,
        keys: [keys.cookieKey]
    })
);
app.use(passport.initialize());
app.use(passport.session());

require('./src/models/userModel');
require('./src/services/passport');
require('./src/routes/authRoute')(app);

app.listen(port, () => {
    console.log("Server running on port " + port);
});