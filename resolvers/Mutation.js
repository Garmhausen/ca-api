const { prisma } = require('../prisma');

function deleteUser(id) {

    return prisma.deleteUser({ id })
}

async function signup(args) {
    return prisma.createUser(args);
};

function updatePermissions(id, permissions) {
    
    return prisma.updateUser({
        where: { id },
        data: {
            permissions: {
                set: permissions
            }
        }
    });
};

function updateUser(id, updates) {
    
    return prisma.updateUser({ where: { id }, data: updates });
}

module.exports = {
    deleteUser,
    signup,
    updatePermissions,
    updateUser
};
