import { Router, json } from 'express';
const router = Router();
import { validationResult } from 'express-validator';

import { authBusiness } from '../business';
import { handleError } from '../utils';
import { validationHelper } from '../helpers';

// all routes in this file begin with /account

router.use(json());

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
        const authToken = authBusiness.createToken(user.id);
        delete user.id;
        res.status(201);  // Created
        response = {
            authToken,
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
        let user = await authBusiness.signin(email, password);
        const authToken = authBusiness.createToken(user.id);
        delete user.id;
        response = {
            authToken,
            data: {
                user
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

// POST /account/requestreset
router.post('/requestreset', async function(req, res) {
    console.log('POST /account/requestReset');
    let response;

    try {
        const email = req.body.email;
        const result = await authBusiness.requestPasswordReset(email);
        response = {
            message: 'Email sent!',
            data: {
                ...result
            }
        }
    } catch (error) {
        response = handleError(error);
        res.status(400);  // bad request
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
        const authToken = authBusiness.createToken(user.id);
        delete user.id;
        response = {
            authToken,
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

export default router;
