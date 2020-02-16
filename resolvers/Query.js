const { prisma } = require('../prisma');

//#region User
function retrieveUser(id) {
    
    return prisma.user({ id });
}

function retrieveUsers() {

    return prisma.users({});
}

function retrieveUserByEmail(email) {
    
    return prisma.user({ email });
}

function retrieveUserByResetToken(resetToken) {
    
    return prisma.users({
        where: {
            resetToken,
            resetTokenExpiration_gte: Date.now() - 3600000
        }
    });
}
//#endregion

//#region Client
function retrieveClient(id) {

    return prisma.client({ id });
}

function retrieveClients() {

    return prisma.clients({});
}

function retrieveClientsByUserId(id) {

    return prisma.clients({
        where: {
            user: {
                where: {
                    id
                }
            }
        }
    });
}

function retrieveClientByClientIdAndUserId(clientId, userId) {

    return prisma.clients({
        where: {
            id: clientId,
            user: {
                id: userId
            }
        }
    });
}
//#endregion

module.exports = {
    retrieveUser,
    retrieveUsers,
    retrieveUserByEmail,
    retrieveUserByResetToken,
    retrieveClient,
    retrieveClients,
    retrieveClientsByUserId,
    retrieveClientByClientIdAndUserId,
}
