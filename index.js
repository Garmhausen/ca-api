require('dotenv').config();
const express = require('express');
const cookieParser = require('cookie-parser');
const cors = require('cors');

const { authBusiness, userBusiness } = require('./business');
const { userService } = require('./service');
const routes = require('./routes');

// start app
const app = express();

// ------ BEGIN MIDDLEWARE ------
const corsOptions = {
    origin: process.env.FRONTEND_URI,
    optionsSuccessStatus: 200,
    credentials: true
}
app.use(cors(corsOptions));

app.use(cookieParser());

// add userId and user to requests if logged in
app.use(async (req, res, next) => {
    const { authToken } = req.cookies;
    
    if (authToken) {
        const userId = authBusiness.getUserIdFromValidToken(authToken);
        req.userId = userId;
        const user = userId ? await userService.getUserById(userId) : null;
        if (user) {
            req.user = userBusiness.makeSlimUser(user);
        }
    }

    return next();
});
// ------ END MIDDLEWARE ------

app.use(routes);

app.listen(process.env.PORT || 3000, function() {
    console.log(`Express server listening on port ${this.address().port} in ${app.settings.env} mode`);
});
