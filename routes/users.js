import { Router } from 'express';
const router = Router();

import { handleError, verifyLoggedIn } from '../utils';
import { userBusiness } from '../business';

// all routes in this file begin with /users

// all routes below require login
router.use((req, res, next) => verifyLoggedIn(req, res, next));

// GET /users
router.get('/', async function (req, res) {
    console.log('GET /users');
    // TODO: think about adding a filter and paging, etc...
    let response;

    try {
        response = await userBusiness.getAllUsers(req.user);
    } catch (error) {
        response = handleError(error);
        res.status(400);  // bad request
    }
    
    res.json(response);
});

export default router;
