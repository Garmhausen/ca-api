require('dotenv').config();
import express from 'express';
import cookieParser from 'cookie-parser';
import cors from 'cors';

import { authBusiness, userBusiness } from './business';
import { userService } from './service';
import routes from './routes';

// start app
const app = express();

// ------ BEGIN MIDDLEWARE ------
const corsOptions = {
    origin: process.env.FRONTEND_URL,
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
