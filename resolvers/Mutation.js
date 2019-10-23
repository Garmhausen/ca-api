const bcrypt = require('bcryptjs');
const { prisma } = require('../prisma');

function deleteUser(id) {

    return prisma.deleteUser({ id })
}

async function resetPassword(args) {
    if (args.password != args.confirmPassword) {
        throw new Error('Passwords do not match!');
    }

    const [user] = await prisma.users({
        where: {
            resetToken: args.resetToken,
            resetTokenExpiration_gte: Date.now() - 3600000
        }
    });
    if (!user) {
        throw new Error('This token is invalid or expired!');
    }
    
    const password = await bcrypt.hash(args.password, 10);

    return prisma.updateUser({
        where: { email: user.email },
        data: {
            password,
            resetToken: null,
            resetTokenExpiration: null
        }
    });
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
    resetPassword,
    signup,
    updatePermissions,
    updateUser
};
