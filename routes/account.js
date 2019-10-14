const express = require('express');
const router = express.Router();
const { check, validationResult } = require('express-validator');
const { handleError, createToken } = require('../utils');
const { query, mutation } = require('../resolvers');

// all routes in this file begin with /account

router.use(express.json());

// POST /account/signup
router.post('/signup', [
    // TODO:  good lord, move all of this validation stuff someplace else in the file structure
    check('name', 'Name must not be empty')
        .isString()
        .trim(),
    check('email')
        .isEmail()
        .withMessage('Email is not a valid email')
        .normalizeEmail()
        .custom(email => {
            return query.retrieveUserByEmail(email).then(user => {
                if (user) {
                    return Promise.reject();
                }
            });
        })
        .withMessage('Email is already in use'),
    check('confirmPassword')
        .custom((confirmPassword, { req }) => {
            if (confirmPassword !== req.body.password) {
                throw new Error('Passwords must match');
            }
            return true;
        }),
    check('password', 'Password is required')
        .isLength({ min: 8 })
        .withMessage('Password must be at least 8 characters')
        .isLength({ max: 24 })
        .withMessage('Password maximum length is 24 characters')
        .matches(/^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#\$%\^&\*])/)
        .withMessage('Password must contain at least one uppercase letter, one lowercase letter, and one symbol')
], async function(req, res) {
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
        const authToken = createToken(user.id);
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
        const authToken = createToken(user.id);
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
