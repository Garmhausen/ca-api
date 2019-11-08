import { prisma } from '../prisma';

//#region User
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

function updateUser(id, data) {
    
    return prisma.updateUser({ where: { id }, data });
}
//#endregion

//#region Client
function deleteClient(id) {

    return prisma.deleteClient({ id });
}

function updateClient(id, data) {

    return prisma.updateClient({ where: { id }, data})
}
//#endregion

export default {
    deleteUser,
    signup,
    updatePermissions,
    updateUser,
    deleteClient,
    updateClient
};
