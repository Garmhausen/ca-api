require('dotenv').config();
const express = require('express');
const cookieParser = require('cookie-parser');
const jwt = require('jsonwebtoken');

const { prisma } = require('./prisma');
const routes = require('./routes');

// start app
const app = express();

// ------ BEGIN MIDDLEWARE ------
var expressWs = require('express-ws')(app); // load before routers
app.use(cookieParser());

// add userId to requests
app.use((req, res, next) => {
    const { token } = req.cookies;

    if (token) {
        const { userId } = jwt.verify(token, process.env.TOKEN_SECRET);
        req.userId = userId;
    }

    return next();
});

// add user to request if they are logged in
app.use(async (req, res, next) => {
    if (!req.userId) return next();

    const user = await prisma
        .user({ id: req.userId })
        .$fragment(`{
            id
            name
            email
            permissions
        }`)
        .catch((err) => {
            console.log('error', err); // TODO: better error handling
        });
    req.user = user;
    
    return next();
});

// ------ END MIDDLEWARE ------
app.use(routes);

// websocket service
app.ws('/ws', function(ws, req) {
    ws.on('message', function(msg) {
        expressWs.getWss().clients.forEach((client) => {
            client.send(msg + ' was received...');
        });
    });
});

app.listen(process.env.PORT || 3000, function() {
    console.log(`Express server listening on port ${this.address().port} in ${app.settings.env} mode`);
});