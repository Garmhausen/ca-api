import { prisma } from '../prisma';

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
//#endregion

export default {
    retrieveUser,
    retrieveUsers,
    retrieveUserByEmail,
    retrieveUserByResetToken,
    retrieveClient,
    retrieveClients,
    retrieveClientsByUserId
}
