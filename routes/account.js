const express = require('express');
const router = express.Router();
const { validationResult } = require('express-validator');
const { authBusiness } = require('../business');
const { handleError } = require('../utils');
const { mutation } = require('../resolvers');
const { validationHelper } = require('../helpers');

// all routes in this file begin with /account

router.use(express.json());

// POST /account/signup
router.post('/signup', validationHelper.accountSignUpValidation, async function(req, res) {
    console.log('POST /account/signup');

    const validationErrors = validationResult(req);
    if (!validationErrors.isEmpty()) {
        return res.status(422).json({ errors: validationErrors.array() });
    }

    let args = req.body; // probably should be more explicit about what goes in to the signup mutation for processing
    delete args.confirmPassword;
    let response;

    try {
        const user = await mutation.signup(args);
        const authToken = authBusiness.createToken(user.id);
        res.status(201);  // Created
        response = {
            authToken,
            data: {
                user: {
                    email: user.email,
                    name: user.name,
                    permissions: user.permissions
                }
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
    let args = req.body;
    let response;

    try {
        const user = await mutation.signin(args);
        const authToken = authBusiness.createToken(user.id);
        response = {
            authToken,
            data: {
                user: {
                    email: user.email,
                    name: user.name,
                    permissions: user.permissions
                }
            }
        }
    } catch (error) {
        response = handleError(error);
        // could be caused by something other than this, need better error handling
        response = "Invalid username or password!";
        res.status(400); // Bad Request
    }

    res.json(response);
});

// POST /account/signout
router.post('/signout', function(req, res) {
    console.log('POST /account/signout');

    res.clearCookie('authToken');
    res.json({
        message: 'Goodbye!'
    });
});

// Password Reset will be implemented in a future story

// POST /account/requestreset
// router.post('/requestreset', async function(req, res) {
//     console.log('POST /account/requestReset');
//     console.log('email:', req.body.email);
//     let response;

//     try {
//         response = await mutation.requestReset(req.body.email);
//     } catch (error) {
//         reponse = handleError(error);
//         res.status(400);  // bad request
//     }

//     res.json(response);
// });

// POST /account/resetpassword
// router.post('/resetpassword', async function(req, res) {
//     console.log('POST /account/resetpassword');
//     let response;

//     try {
//         response = await mutation.resetPassword(req.body);
//         // TODO: make an authToken and attach
//     } catch (error) {
//         response = handleError(error);
//         res.status(400);  // bad request
//     }

//     res.json(response);
// });

module.exports = router;
