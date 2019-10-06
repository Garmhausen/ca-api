const { prisma } = require('../prisma');

function retrieveUser(id) {
    
    return prisma.user({ id });
}

function retrieveUsers() {

    return prisma.users({});
}

function retrieveUserByEmail(email) {
    return prisma.user({ email });
}

module.exports = {
    retrieveUser,
    retrieveUsers,
    retrieveUserByEmail
}
