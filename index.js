const express = require('express');
const passport = require('passport');
const app = express();

// server port
const port = process.env.PORT || 5000;

require('./src/services/passport');
require('./src/routes/authRoute')(app);

app.listen(port, () => {
    console.log("Server running on port " + port);
});