require('dotenv').config();
const express = require('express');
const cookieParser = require('cookie-parser');
const cors = require('cors');

const { authBusiness, userBusiness } = require('./business');
const { userService } = require('./service');
const routes = require('./routes');

const app = express();

const corsOptions = {
    origin: process.env.FRONTEND_URL,
    optionsSuccessStatus: 200,
    credentials: true
}

app.use(cors(corsOptions));

app.use(cookieParser());

app.use(async (req, res, next) => {
    const { token } = req.cookies;
    
    if (token) {
        const user = await authBusiness.getUserFromValidSession(token);

        if (user) {
            req.userId = user.id;
            req.user = userBusiness.makeSlimUser(user);
        } else {
            res.clearCookie('token');
        }
    }

    return next();
});

app.use(routes);

app.listen(process.env.PORT || 3000, function() {
    console.log(`Express server listening on port ${this.address().port} in ${app.settings.env} mode`);
});
