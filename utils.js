export function handleError(error) {
    console.log('There was an error:', error.message); // TODO: replace with actual logging
    
    return error.message;
}

export function hasPermission(user, permissionsNeeded) {
    if (!user) {
        throw new Error(`You must be logged in!`);
    }

    const matchedPermissions = user.permissions.filter(permissionTheyHave => permissionsNeeded.includes(permissionTheyHave));

    if (!matchedPermissions.length) {
        throw new Error(`You do not have sufficient permissions.`);
    }
}

export const slimUser = `
    {
        id
        email
        name
        permissions
    }
`;

export function verifyLoggedIn(req, res, next) {
    if (!req.user) {
        res.status(400); // bad request
        res.json({ message: 'You must be logged in!' });
    } else {
        return next();
    }
}
