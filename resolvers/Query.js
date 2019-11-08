import { prisma } from '../prisma';

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

export default {
    retrieveUser,
    retrieveUsers,
    retrieveUserByEmail,
    retrieveUserByResetToken
}
