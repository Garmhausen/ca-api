const { prisma } = require('../prisma');

//#region User
function deleteUser(id) {

    return prisma.deleteUser({ id })
}

function signup(args) {

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

function updateUser(id, data) {
    
    return prisma.updateUser({ where: { id }, data });
}
//#endregion

//#region Client
function createClient(args) {

    return prisma.createClient(args);
}

function deleteClient(id) {

    return prisma.deleteClient({ id });
}

function updateClient(id, data) {

    return prisma.updateClient({ where: { id }, data})
}
//#endregion

module.exports = {
    deleteUser,
    signup,
    updatePermissions,
    updateUser,
    createClient,
    deleteClient,
    updateClient
};
