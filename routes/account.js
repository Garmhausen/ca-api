const express = require('express');
const router = express.Router();
const { validationResult } = require('express-validator');
const jwt = require('jsonwebtoken');

const { authBusiness } = require('../business');
const { handleError, verifyLoggedIn } = require('../utils');
const { validationHelper } = require('../helpers');

const sessionDuration = process.env.SESSION_DURATION;

// all routes in this file begin with /account

router.use(express.json());

// POST /account/signup
router.post('/signup', validationHelper.accountSignUpValidation, async function(req, res) {
    console.log('POST /account/signup');

    const validationErrors = validationResult(req);
    if (!validationErrors.isEmpty()) {
        return res.status(422).json({ errors: validationErrors.array() });
    }

    let response;
    let args = req.body;
    
    try {
        let user = await authBusiness.userSignUp(args);
        const token = await authBusiness.startSession(user.id);
        res.cookie('token', token, { maxAge: sessionDuration, httpOnly: true });
        res.cookie('isAuthenticated', true, { maxAge: sessionDuration });
        delete user.id;
        res.status(201);  // Created
        response = {
            data: {
                user
            }
        }
    } catch (error) {
        response = handleError(error);
        res.status(400); // Bad Request
    }

    res.json(response);
});

// POST /account/signin
router.post('/signin', async function(req, res) {
    console.log('POST /account/signin');
    const email = req.body.email;
    const password = req.body.password;
    let response;

    try {
        const user = await authBusiness.signin(email, password);

        if (!req.userId) {
            const token = await authBusiness.startSession(user.id);
            res.cookie('token', token, { maxAge: sessionDuration, httpOnly: true });
            res.cookie('isAuthenticated', true, { maxAge: sessionDuration });
        }

        delete user.id;
        response = { data: { user } };
    } catch (error) {
        response = handleError(error);
        // could be caused by something other than this, need better error handling
        response = "Invalid username or password!";
        res.status(400); // Bad Request
    }

    res.json(response);
});

// POST /account/requestreset
router.post('/requestreset', async function(req, res) {
    console.log('POST /account/requestReset');
    const response = {
        message: 'Email sent!'
    };

    try {
        const email = req.body.email;
        const result = await authBusiness.requestPasswordReset(email);
        console.log('emailed password reset request', result);  // TODO: replace with real logging later
    } catch (error) {
        // if the email isn't found or if there is an error with the request,
        // then swallow it at this level.  there should still be a server-side error
        // logged at a lower level.
        handleError(error);
    }

    res.json(response);
});

// POST /account/resetpassword
router.post('/resetpassword', validationHelper.resetPasswordValidation, async function(req, res) {
    console.log('POST /account/resetpassword');

    const validationErrors = validationResult(req);
    if (!validationErrors.isEmpty()) {
        return res.status(422).json({ errors: validationErrors.array() });
    }
    
    let response;

    try {
        const resetToken = req.body.resetToken;
        const password = req.body.password;
        const confirmPassword = req.body.confirmPassword;
        const user = await authBusiness.resetPassword(resetToken, password, confirmPassword);
        const token = authBusiness.startSession(user.id);
        res.cookie('token', token, { maxAge: sessionDuration, httpOnly: true });
        res.cookie('isAuthenticated', true, { maxAge: sessionDuration });
        delete user.id;
        response = {
            data: {
                user
            }
        }
    } catch (error) {
        response = handleError(error);
        res.status(400);  // bad request
    }

    res.json(response);
});

// all routes below require login
router.use((req, res, next) => verifyLoggedIn(req, res, next));

// POST /account/signout
router.post('/signout', function (req, res) {
    console.log('POST /account/signout');
    const { token } = req.cookies;
    
    if (token) {
        const sessionId = jwt.verify(token, process.env.TOKEN_SECRET);
        authBusiness.endSession(sessionId);
    }

    res.clearCookie('token');
    res.clearCookie('isAuthenticated');
    res.json({
        message: 'Goodbye!'
    });
});

module.exports = router;
