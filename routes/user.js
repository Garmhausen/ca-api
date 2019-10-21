const express = require('express');
const router = express.Router();
const { hasPermission, handleError, slimUser, verifyLoggedIn } = require('../utils');
const { mutation } = require('../resolvers');
const { authBusiness, userBusiness } = require('../business');

// all routes in this file begin with /user

// all routes below require login
router.use((req, res, next) => verifyLoggedIn(req, res, next));

// GET /user/:id
router.get('/:id', async function(req, res) {
    console.log('GET /user/' + req.params.id);
    let response;

    try {
        if (req.params.id != req.userId) {
            hasPermission(req.user, ['ADMIN']);
        }

        const user = await userBusiness.getUserById(req.params.id, req.user).$fragment(userBusiness.slimUserFragment);

        response = {
            authToken: authBusiness.createToken(req.userId),
            data: {
                user
            }
        };
    } catch (error) {
        response = handleError(error);
        res.status(400);  // bad request
    }
    
    res.json(response);
});

router.use(express.json()); // required for parsing json body in request

// PATCH /user/:id
router.patch('/:id', async function(req, res) {
    console.log('POST /user');
    const updates = { ...req.body };
    let response;

    if (updates.id) {
        delete updates.id;
    }

    if (updates.permissions) {
        // updating permission is not intended to be done in this method
        // see /user/:id/permissions method below
        delete updates.permissions;
    }

    try {
        const user = await userBusiness.updateUser(req.userId, updates, req.user);

        response = {
            authToken: authBusiness.createToken(req.userId),
            data: {
                user
            }
        };
    } catch (error) {
        response = handleError(error);
        res.status(400); // bad request
    }

    res.json(response);
});

// DELETE /user/:id
router.delete('/:id', async function(req, res) {
    console.log(`DELETE /user/${req.params.id}`);
    let response;

    try {
        const user = await userBusiness.deleteUser(req.params.id, req.user);

        response = {
            authToken: authBusiness.createToken(req.userId),
            data: {
                user
            }
        };
    } catch (error) {
        response = handleError(error);
        res.status(400); // bad request
    }

    res.json(response);
});

// POST /user/:id/permissions
router.post('/:id/permissions', async function(req, res) {
    console.log(`POST /user/${req.params.id}/permissions`);
    let response;

    try {
        hasPermission(req.user, ['ADMIN', 'PERMISSIONUPDATE']);///////////
        response = mutation.updatePermissions(req.params.id, req.body.permissions).$fragment(slimUser);//////////
    } catch (error) {
        response = handleError(error);
        res.status(400);
    }

    res.json(response);
})

module.exports = router;
