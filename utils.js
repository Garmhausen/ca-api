exports.clientsGridDefault = {
    page: 0,
    pagesize: 20,
    sortby: 'name_DESC',
};

exports.handleError = (error) => {
    console.log('There was an error:', error.message); // TODO: replace with actual logging
    
    return error.message;
};

exports.hasPermission = (user, permissionsNeeded) => {
    if (!user) {
        throw new Error(`You must be logged in!`);
    }

    const matchedPermissions = user.permissions.filter(permissionTheyHave => permissionsNeeded.includes(permissionTheyHave));

    if (!matchedPermissions.length) {
        throw new Error(`You do not have sufficient permissions.`);
    }
};

exports.slimUser = `
    {
        id
        email
        name
        permissions
    }
`;

exports.verifyLoggedIn = (req, res, next) => {
    if (!req.user) {
        res.status(401); // unauthorized
        res.json({ message: 'You must be logged in!' });
    } else {
        return next();
    }
};
