require('dotenv').config();
const express = require('express');
const cookieParser = require('cookie-parser');
const cors = require('cors');
const jwt = require('jsonwebtoken');

const { authBusiness, userBusiness } = require('./business');
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
    try {
        const { token } = req.cookies;
        const sessionId = token ? jwt.verify(token, process.env.TOKEN_SECRET) : null;

        if (sessionId) {
            const isAuthenticated = await authBusiness.checkSession(sessionId);
            if (isAuthenticated) {
                const user = await authBusiness.getUserBySessionId(sessionId);
                req.user = userBusiness.makeSlimUser(user);
                req.userId = user.id;
            } else {
                authBusiness.endSession(sessionId);
                res.clearCookie('token');
            }
        }
    } catch (error) {
        console.log('error:', error);
    }

    return next();
});

app.use(routes);

app.listen(process.env.PORT || 3000, function() {
    console.log(`Express server listening on port ${this.address().port} in ${app.settings.env} mode`);
});
